import React from "react";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { Offline, Online } from "react-detect-offline";

import { Panel, Input, FormLayout, Button, Group, Cell, List, Div, Separator, Header, FormLayoutGroup } from "@vkontakte/vkui";
import { OfflineBlock, Spinner, PanelHeader, Error, SkinViewer } from "./components/components";

import { timeConvert, resizeWindow } from "../services/_functions";

import { IconRun, IconWalk } from "./components/icons";
import Icon24Message from "@vkontakte/icons/dist/24/message";
import Icon24DoneOutline from "@vkontakte/icons/dist/24/done_outline";
import Icon24Chevron from "@vkontakte/icons/dist/24/chevron";
import Icon24Dropdown from "@vkontakte/icons/dist/24/dropdown";
import Icon24Write from "@vkontakte/icons/dist/24/write";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Pause from "@vkontakte/icons/dist/24/pause";
import Icon16Play from "@vkontakte/icons/dist/16/play";

import "./user.css";

class UserInfo extends React.Component {

    state = {
        nickname: "",
        historyList: [],
        list: null,
        skin: null,
        cape: null
    };

    componentDidMount() {
        VKBridge.send("VKWebAppStorageGet", {
            keys: ["steveHistoryList"]
        })
            .then(res => {
                if (res.keys[0].value.length > 1) this.setState({historyList: res.keys[0].value.split(",")});
            });
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 16)});
    }

    async getInfo() {
        this.setState({ spinner: true, list: null, username: null, error: null, skin: null, cape: null, regDate: null, lock: false, openHistory: false, walk: true, run: false, paused: false, sent: false});

        await axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                const usernameHistory = data.username_history;
                const username =  data.username;
                const skin = data.textures.skin.url;
                const cape = data.textures.cape || null;
                const createdAt = data.created_at || null ;

                this.setState({ list: usernameHistory, username: username, skin: skin, cape: cape, spinner: false });

                if (!this.state.historyList.includes(data.username)) this.addHistory(data.username);
                if (createdAt) this.setState({ regDate: timeConvert(createdAt) });

                resizeWindow(650 + (61 * usernameHistory.length));
            })
            .catch(err => {
                this.setState({spinner: false});

                if (err.response && err.response.status) {
                    if (err.response.status === 404) return this.setState({error: `Игрока с никнеймом ${this.state.nickname} не существует!`});
                    if (err.response.status === 400) return this.setState({error: "Никнейм может содержать только латинские буквы, цифры и символ \"_\"."});
                }

                this.setState({ error: "Произошла ошибка. Попробуйте позже."});
                return console.log(err);
            });
    }

    share () {
        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(data => {
                if (data.result) {
                    this.setState({ sent: true });
                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098, payload:
                            {
                                type: "document", url: this.state.skin,
                                name: this.state.username
                            }
                    });
                }
            })
            .catch(() => {
                this.setState({ lock: false });
            });
    }

    async addHistory(nickname) {
        const historyList = [...this.state.historyList];

        historyList.unshift(nickname);

        if (!(historyList.length <= 10)) historyList.splice(-1,1);

        await this.setState({historyList});
        await this.saveHistory();
    }

    saveHistory() {
        VKBridge.send("VKWebAppStorageSet", {
            key: "steveHistoryList",
            value: this.state.historyList.join(",")
        });
    }

    render() {
        const { id, navigator } = this.props;
        const { regDate, spinner, editHistory, historyList, nickname, openHistory, backup, skin, username, error, list, lock, cape, walk, run, paused, sent } = this.state;
        const scheme = sessionStorage.getItem("scheme");

        return (
            <Panel separator={false} id={id}>
                <PanelHeader status="Информация об игроке"
                        navigator={navigator}
                        left
                />
                <Online>
                    <FormLayout>
                        <FormLayoutGroup top="Никнейм"
                                         bottom={"Может содержать только латинские буквы, цифры и символ \"_\". (От 2 до 16 символов)"}
                        >
                            <div style={{display: "flex", alignItems: "center"}}>
                                <div style={{flexGrow: 99}}>
                                    <Input name="nickname"
                                           disabled={spinner || editHistory}
                                           value={nickname}
                                           onChange={this.onChange.bind(this)}
                                           status={nickname.length > 1 || nickname === "" ? "default" : "error"}
                                           placeholder="Введите никнейм"
                                           maxLength="16"
                                           pattern="^[A-Za-z0-9_]+$"
                                    />
                                </div>
                                <div style={{flexGrow: 1, marginRight: "5px"}}>
                                    {
                                        openHistory ?
                                            <Icon24Dropdown style={editHistory ? {opacity: ".2"} : ""} onClick={() => !editHistory ? this.setState({openHistory: false}) : undefined}
                                                            width={35}
                                                            height={35}
                                            />
                                            :
                                            <Icon24Chevron style={spinner || historyList.length < 1 ? {opacity: ".2"} : ""}
                                                           onClick={() => spinner || historyList.length < 1 ? undefined : this.setState({openHistory: true, editHistory: false})}
                                                           width={35}
                                                           height={35}
                                            />
                                    }
                                </div>
                            </div>
                        </FormLayoutGroup>
                    </FormLayout>
                    {
                        openHistory && (
                            (historyList.length > 0 || editHistory) &&
                            <div>
                                <Separator/>
                                <Header mode="secondary"
                                        aside={editHistory ?
                                    <div style={{display: "flex"}}>
                                        <Icon24Cancel onClick={() => this.setState({historyList: backup, editHistory: false})}
                                                      style={{marginRight: "5px"}}
                                        />
                                        <Icon24DoneOutline
                                            onClick={() => {
                                                this.setState({editHistory: false, openHistory: !historyList.length <= 0});
                                                this.saveHistory();
                                            }}
                                        />
                                    </div>
                                    :
                                    <Icon24Write onClick={() => this.setState({editHistory: true, backup: historyList})}/>
                                }
                                >
                                    История запросов
                                </Header>
                                <List>
                                    {
                                        historyList.map((item, index) => (
                                            <Cell key={item} draggable={editHistory} removable={editHistory}
                                                  onDragFinish={({from, to}) => {
                                                      const historyList = [...this.state.historyList];

                                                      historyList.splice(from, 1);
                                                      historyList.splice(to, 0, this.state.historyList[from]);

                                                      this.setState({historyList});
                                                  }}
                                                  onRemove={async () => {
                                                      await this.setState({historyList: [...this.state.historyList.slice(0, index), ...this.state.historyList.slice(index + 1)]});
                                                  }}
                                                  onClick={async () => {
                                                      await this.setState({nickname: item, openHistory: false});
                                                      await this.getInfo();
                                                  }}
                                            >
                                                {item}
                                            </Cell>
                                        ))
                                    }
                                </List>
                                <Separator/>
                            </div>
                        )
                    }
                    <Div>
                        <Button disabled={!(nickname.length > 1 && nickname.match("^[A-Za-z0-9_]+$") && !spinner && !editHistory)}
                                onClick={() => this.getInfo()}
                                size="xl"
                        >
                            <b>Получить информацию</b>
                        </Button>
                    </Div>
                    {
                        spinner && <Spinner/>
                    }
                    {
                        skin &&
                        <Group top={`Скин игрока ${username}`}>
                            <Separator/>
                            <div className={`skin skin-${scheme} ${this.state.paused && "skin-animation_paused"} skin-bg_animation`}>
                                <Div className="skin-icons skin-block">
                                    <Button className="skin-button"
                                            onClick={() => this.setState({run: this.state.walk, walk: !this.state.walk})}
                                    >
                                        {!this.state.walk ? <IconWalk/> : <IconRun/>}
                                    </Button>
                                    <Button className="skin-button"
                                            onClick={() => this.setState({paused: !this.state.paused})}
                                    >
                                        {!this.state.paused ? <Icon24Pause width={16} height={16}/> : <Icon16Play/>}
                                    </Button>
                                </Div>
                                <div className="skin-block skin-center">
                                    <SkinViewer skinUrl={`https://stevecors.herokuapp.com/${skin}`}
                                                capeUrl={cape ? `https://stevecors.herokuapp.com/${cape}` : ""}
                                                className="skin-shadow"
                                                walk={walk}
                                                run={run}
                                                paused={paused}
                                                height="196"
                                                width="196"
                                    />
                                </div>
                            </div>
                            <Separator/>
                            <Div style={{ display: "flex" }}>
                                <Button stretched
                                        before={sent ? <Icon24DoneOutline width={16} height={16}/> : <Icon24Message width={16} height={16} />}
                                        disabled={lock}
                                        onClick={() => {
                                            this.setState({ lock: true });
                                            this.share()}
                                        }
                                >
                                    <b>{sent ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b>
                                </Button>
                            </Div>
                            <Separator/>
                        </Group>
                    }
                    <List top={username ? `История никнейма ${username}` : ""}>
                        {
                            list && list.map(({username, changed_at}, index) =>
                                <Cell key={index}
                                      description={changed_at ? timeConvert(changed_at) : regDate ? regDate : "Первый"}
                                >
                                    {username}
                                </Cell>
                            ).reverse()
                        }
                    </List>
                    {
                        error && <Error error={error}/>
                    }
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }

}

export default UserInfo;
