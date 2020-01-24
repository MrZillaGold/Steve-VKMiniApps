import React from 'react';

import axios from 'axios';
import SkinViewer from "./components/skinviewer";
import VKConnect from "@vkontakte/vk-connect";
import { Offline, Online } from 'react-detect-offline';

import {timeConvert, fixInput, resizeWindow} from "../services/_functions";

import OfflineBlock from './components/offline';
import Error from "./components/error";
import Spinner from "./components/spinner";
import HeaderButtons from "./components/headerbuttons";

import {Panel, PanelHeader, PanelHeaderButton, PanelHeaderContent, Input, FormLayout, Button, Group, Cell, List, Div, Separator, Header, FormLayoutGroup} from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Pause from '@vkontakte/icons/dist/24/pause';
import Icon16Play from '@vkontakte/icons/dist/16/play';
import IconRun from "./components/icons/run";
import IconWalk from "./components/icons/walk";

import "./user.css";

class UserInfo extends React.Component {

    state = {
        nickname: '',
        historyList: [],
        list: false,
        skin: false,
        cape: false
    };

    onChange(e) {
        fixInput();
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 16)});
    }

    async onClick () {
        if (this.state.nickname.length === 0){
            return this.setState({ value: 'error' });
        }
        this.setState({ spinner: true, list: false, username: false, error: false, value: false, skin: false, cape: false, regDate: false, lock: false, openHistory: false, walk: true, run: false, paused: false, sent: false});
        await axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data.textures.cape) {
                    this.setState({ cape: data.textures.cape.url });
                }
                this.setState({ list: data.username_history, username: data.username, skin: data.textures.skin.url, spinner: null });
                if (!this.state.historyList.includes(data.username)) {
                    this.addHistory(data.username);
                }
                console.log(`URL Скина: ${data.textures.skin.url}`);
                if (data.created_at) {
                    this.setState({ regDate: timeConvert(data.created_at) });
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status) {
                    if (err.response.status === 404) {
                        this.setState({error: `Игрока с никнеймом ${this.state.nickname} не существует!`, spinner: null});
                        return console.log(`Игрок с никнеймом ${this.state.nickname} не существует!`);
                    }
                    if (err.response.status === 400) {
                        this.setState({error: `Никнейм может содержать только латинские буквы, цифры и символ "_".`, spinner: null});
                        return console.log(`Произошла ошибка 400 (Bad Request!), проверьте вводимые данные!`);
                    }
                }
                this.setState({ error: `Произошла ошибка. Попробуйте позже.`, spinner: null });
                return console.log(err);
            });
        await resizeWindow(650 + (61 * this.state.list.length));
    }

    share () {
        console.log("Начинаем отправку сообщения.");
        VKConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098})
            .then(data => {
                console.log(data.result);
                if(data.result) {
                    this.setState({ sent: true });
                    VKConnect.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"type":"document", "url": this.state.skin, "name": this.state.username}})
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ lock: false });
            });
    }

    componentDidMount() {
        VKConnect.send("VKWebAppStorageGet", {"keys": ["steveHistoryList"]})
            .then(res => {
                console.log(res);
                console.log(`История запросов: ${res.keys[0].value}`);
                if (res.keys[0].value.length > 1) {
                    this.setState({historyList: res.keys[0].value.split(',')});
                }
            });
    }

    async addHistory(nickname) {
        console.log("Добавляем никнейм в историю.");
        const historyList = [...this.state.historyList];
        historyList.unshift(nickname);
        if (!(historyList.length <= 10)) {
            console.log("История запросов больше 10, убираем последний элемент в истории.");
            historyList.splice(-1,1);
        }
        await this.setState({historyList});
        await VKConnect.send("VKWebAppStorageSet", {"key": "steveHistoryList", "value": this.state.historyList.join(",")});
    }

    saveHistory() {
        console.log("Сохраняем историю.");
        VKConnect.send("VKWebAppStorageSet", {"key": "steveHistoryList", "value": this.state.historyList.join(",")});
    }

    changeSkinAnimation() {
        this.state.walk ? this.setState({run: true, walk: false}) : this.setState({run: false, walk: true})
    }

    render() {
        const {id, navigator} = this.props;
        const {regDate, spinner, editHistory, historyList, nickname, openHistory, backup, skin, username, error, list, lock, cape, walk, run, paused, sent} = this.state;
        const scheme = sessionStorage.getItem('scheme');

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<PanelHeaderButton onClick={() => navigator.goBack()}><HeaderButtons /></PanelHeaderButton>}>
                    <PanelHeaderContent status="Информация об игроке">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        <FormLayoutGroup top="Никнейм" bottom={"Может содержать только латинские буквы, цифры и символ \"_\". (От 2 до 16 символов)"}>
                            <div style={{display: "flex", alignItems: "center"}} className="Input">
                                <div style={{flexGrow: 99}}>
                                    <Input
                                        name='nickname'
                                        disabled={spinner || editHistory}
                                        value={nickname}
                                        onChange={this.onChange.bind(this)}
                                        status={nickname.length > 1 || nickname === "" ? 'default' : 'error'}
                                        placeholder="Введите никнейм"
                                        maxLength='16'
                                        pattern='^[A-Za-z0-9_]+$'
                                    />
                                </div>
                                <div style={{flexGrow: 1, marginRight: "5px"}}>
                                    {
                                        openHistory ?
                                            <Icon24Dropdown style={editHistory ? {opacity: ".2"} : ""} onClick={() => !editHistory ? this.setState({openHistory: false}) : undefined} width={35} height={35}/>
                                            :
                                            <Icon24Chevron style={spinner || historyList.length < 1 ? {opacity: ".2"} : ""} onClick={() => spinner || historyList.length < 1 ? undefined : this.setState({openHistory: true, editHistory: false})} width={35} height={35}/>
                                    }
                                </div>
                            </div>
                            {
                                openHistory && (
                                    (historyList.length > 0 || editHistory) &&
                                    <Group style={{marginTop: "20px"}}>
                                        <Separator/>
                                        <Header mode="secondary" aside={editHistory ?
                                            <div style={{display: "flex"}}>
                                                <Icon24Cancel onClick={() => this.setState({historyList: backup, editHistory: false})} style={{marginRight: "5px"}}/>
                                                <Icon24DoneOutline onClick={() => {
                                                    this.setState({editHistory: false, openHistory: !historyList.length <= 0});
                                                    this.saveHistory();
                                                }}/>
                                            </div>
                                            : <Icon24Write onClick={() => this.setState({editHistory: true, backup: historyList})}/>}>
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
                                                              await this.onClick();
                                                          }}
                                                    >{item}</Cell>
                                                ))
                                            }
                                        </List>
                                        <Separator/>
                                    </Group>
                                )
                            }
                        </FormLayoutGroup>
                        <Button disabled={!(nickname.length > 1 && nickname.match('^[A-Za-z0-9_]+$') && !spinner && !editHistory)} onClick={this.onClick.bind(this)} size='xl'>
                            <b>Получить информацию</b>
                        </Button>
                        {
                            spinner && <Spinner/>
                        }
                        {
                            skin &&
                            <Group top={`Скин игрока ${username}`}>
                                <Separator/>
                                <div className={`skin skin-${scheme} ${this.state.paused && "skin-animation_paused"} skin-bg_animation`}>
                                    <div className="skin-icons skin-block">
                                        <Button className="skin-button" onClick={() => this.changeSkinAnimation()}>{!this.state.walk ? <IconWalk/> : <IconRun/>}</Button>
                                        <Button className="skin-button" onClick={() => this.setState({paused: !this.state.paused})}>{!this.state.paused ? <Icon24Pause width={16} height={16}/> : <Icon16Play/>}</Button>
                                    </div>
                                    <div className="skin-block skin-center">
                                        <SkinViewer
                                            skinUrl={`https://stevecors.herokuapp.com/${skin}`}
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
                                <Div style={{ display: 'flex' }}>
                                    <Button stretched before={sent ? <Icon24DoneOutline width={16} height={16}/> : <Icon24Message width={16} height={16} />} disabled={lock} onClick={() => {
                                        this.setState({ lock: true });
                                        this.share()}
                                    }>
                                        <b>{sent ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b>
                                    </Button>
                                </Div>
                                <Separator/>
                            </Group>
                        }
                        <List top={username ? `История никнейма ${username}` : ""}>
                            {
                                list && list.map(({username, changed_at}, i) =>
                                    <Cell key={i} description={changed_at !== undefined ? timeConvert(changed_at) : regDate ? regDate : 'Первый'}>
                                        {username}
                                    </Cell>
                                ).reverse()
                            }
                        </List>
                        {
                            error && <Error error={error}/>
                        }
                    </FormLayout>
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }

}

export default UserInfo;
