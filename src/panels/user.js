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
        data: {},
        skin: {}
    };

    componentDidMount() {
        VKBridge.send("VKWebAppStorageGet", {
            keys: ["steveHistoryList"]
        })
            .then(res => {
                if (res.keys[0].value.length > 1) this.setState({ historyList: res.keys[0].value.split(","), historyLoaded: true });

                this.setState({ historyLoaded: true });
            });
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({ [name]: value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 16) });
    }

    async getInfo() {
        const { nickname, historyList } = this.state;

        this.setState({ spinner: true, error: null, lock: false, data: {}, openHistory: false, walk: true, run: false, paused: false, sent: false});

        await axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${nickname}`)
            .then(res => {
                return res.data;
            })
            .then(async data => {
                const { username_history, username, created_at, textures } = data;

                const userData = {
                    list: username_history,
                    username: username,
                    createdAt: created_at ? timeConvert(created_at) : null,
                    skin: {
                        url: textures.skin.url,
                        isSlim: textures.slim || false,
                        cape: (textures.cape && textures.cape.url) || null
                    }
                };

                this.setState({ data: userData, spinner: false });

                if (!historyList.includes(username)) this.addHistory(username);

                resizeWindow(650 + (61 * username_history.length));
            })
            .catch(err => {
                this.setState({ spinner: false });

                if (err.response && err.response.status) {
                    if (err.response.status === 404) return this.setState({error: `Игрока с никнеймом ${nickname} не существует!`});
                    if (err.response.status === 400) return this.setState({error: "Никнейм может содержать только латинские буквы, цифры и символ \"_\"."});
                }

                this.setState({ error: "Произошла ошибка. Попробуйте позже."});
                return console.log(err);
            });
    }

    share () {
        const { data } = this.state;

        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(res => {
                if (res.result) {
                    this.setState({ sent: true });
                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "document", url: data.skin.url,
                            name: data.username
                        }
                    });
                }
            })
            .catch(() => this.setState({ lock: false }));
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
        const { regDate, spinner, editHistory, historyList, nickname, openHistory, backup, error, lock, walk, run, paused, sent, data, historyLoaded } = this.state;
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
                                            <Icon24Dropdown style={editHistory ? {opacity: ".2"} : ""}
                                                            onClick={() => !editHistory ? this.setState({ openHistory: false }) : undefined}
                                                            width={35}
                                                            height={35}
                                            />
                                            :
                                            <Icon24Chevron style={spinner || !historyLoaded ? {opacity: ".2"} : ""}
                                                           onClick={() => spinner || !historyLoaded ? undefined : this.setState({ openHistory: true, editHistory: false })}
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
                            <div>
                                <Separator/>
                                <Header mode="secondary"
                                        aside={
                                            (historyList.length > 0 || editHistory) &&
                                            (editHistory ?
                                                    <div style={{display: "flex"}}>
                                                        <Icon24Cancel onClick={() => this.setState({ historyList: backup, editHistory: false })}
                                                                      style={{marginRight: "5px"}}
                                                        />
                                                        <Icon24DoneOutline
                                                            onClick={() => {
                                                                this.setState({ editHistory: false });
                                                                this.saveHistory();
                                                            }}
                                                        />
                                                    </div>
                                                    :
                                                    <Icon24Write onClick={() => this.setState({ editHistory: true, backup: historyList })}/>
                                            )
                                        }
                                >
                                    История запросов
                                </Header>
                                {
                                    (historyList.length > 0 || editHistory) ?
                                        <List>
                                            {
                                                historyList.map((item, index) => (
                                                    <Cell key={item}
                                                          draggable={editHistory}
                                                          removable={editHistory}
                                                          onDragFinish={({from, to}) => {
                                                              const historyList = [...this.state.historyList];

                                                              historyList.splice(from, 1);
                                                              historyList.splice(to, 0, this.state.historyList[from]);

                                                              this.setState({historyList});
                                                          }}
                                                          onRemove={async () => {
                                                              await this.setState({ historyList: [...this.state.historyList.slice(0, index), ...this.state.historyList.slice(index + 1)] });
                                                          }}
                                                          onClick={async () => {
                                                              await this.setState({ nickname: item, openHistory: false });
                                                              await this.getInfo();
                                                          }}
                                                    >
                                                        {item}
                                                    </Cell>
                                                ))
                                            }
                                        </List>
                                        :
                                        <Error error={"В истории запросов нет ни одной записи. Новая запись появится после получения информации об игроке."}/>
                                }
                                <Separator style={{ margin: "12px 0" }}/>
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
                        data.skin && data.skin.url &&
                        <Group top={`Скин игрока ${data.username}`}>
                            <Separator/>
                            <div className={`skin skin-${scheme} ${paused && "skin-animation_paused"} skin-bg_animation`}>
                                <Div className="skin-icons skin-block">
                                    <Button className="skin-button"
                                            onClick={() => this.setState({run: walk, walk: !walk})}
                                    >
                                        {!walk ? <IconWalk/> : <IconRun/>}
                                    </Button>
                                    <Button className="skin-button"
                                            onClick={() => this.setState({paused: !paused})}
                                    >
                                        {!paused ? <Icon24Pause width={16} height={16}/> : <Icon16Play/>}
                                    </Button>
                                </Div>
                                <div className="skin-block skin-center">
                                    <SkinViewer skinUrl={`https://stevecors.herokuapp.com/${data.skin.url}`}
                                                capeUrl={data.skin.cape ? `https://stevecors.herokuapp.com/${data.skin.cape}` : ""}
                                                className="skin-shadow"
                                                walk={walk}
                                                slim={data.skin.isSlim}
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
                                        before={sent ? <Icon24DoneOutline width={16} height={16}/> : <Icon24Message width={16} height={16}/>}
                                        disabled={lock}
                                        onClick={() => {
                                            this.setState({ lock: true });
                                            this.share();
                                        }}
                                >
                                    <b>{sent ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b>
                                </Button>
                            </Div>
                            <Separator style={{ margin: "6px 0 0 0" }}/>
                        </Group>
                    }
                    <List top={data.username ? `История никнейма ${data.username}` : ""}>
                        {
                            data.list && data.list.map(({username, changed_at}, index) =>
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