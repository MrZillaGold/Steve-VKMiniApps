import React from 'react';

import axios from 'axios';
import Skinview3d from 'react-skinview3d'
import VKConnect from "@vkontakte/vk-connect";
import { Offline, Online } from 'react-detect-offline';

import {timeConvert, fixInput, resizeWindow} from "../services/_functions";

import OfflineBlock from './components/offline';
import Error from "./components/error";
import Spinner from "./components/spinner";
import HeaderButtons from "./components/headerbuttons";

import {Panel, PanelHeader, HeaderButton, PanelHeaderContent, Input, FormLayout, Button, Group, Cell, List, Div, Separator, Header, FormLayoutGroup} from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

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
        this.setState({ spinner: true, list: false, username: false, error: false, value: false, skin: false, cape: false, regDate: false, lock: false, openHistory: false});
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
                this.setState({ spinner: null });
                if (err.response.status) {
                    if (err.response.status === 404) {
                        this.setState({error: `Игрока с никнеймом ${this.state.nickname} не существует!`});
                        return console.log(`Игрок с никнеймом ${this.state.nickname} не существует!`);
                    }
                    if (err.response.status === 400) {
                        this.setState({error: `Никнейм может содержать только латинские буквы, цифры и символ "_".`});
                        return console.log(`Произошла ошибка 400 (Bad Request!), проверьте вводимые данные!`);
                    }
                }
                if (err) {
                    this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
                    return console.log(err);
                }
            });
        await resizeWindow(650 + (61 * this.state.list.length));
    }

    share () {
        console.log("Начинаем отправку сообщения.");
        VKConnect.sendPromise("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098})
            .then(data => {
                console.log(data.result);
                if(data.result) {
                    this.setState({ lock: true });
                    VKConnect.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"type":"document", "url": this.state.skin, "name": this.state.username}})
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        VKConnect.sendPromise("VKWebAppStorageGet", {"keys": ["steveHistoryList"]})
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

    render() {
        const {id, navigator} = this.props;
        const {regDate} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons /></HeaderButton>}>
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
                                        disabled={this.state.spinner || this.state.editHistory}
                                        value={this.state.nickname}
                                        onChange={this.onChange.bind(this)}
                                        status={this.state.nickname.length > 1 || this.state.nickname === "" ? 'default' : 'error'}
                                        placeholder="Введите никнейм"
                                        maxLength='16'
                                        pattern='^[A-Za-z0-9_]+$'
                                    />
                                </div>
                                <div style={{flexGrow: 1, marginRight: "5px"}}>
                                    {
                                        this.state.openHistory ?
                                            <Icon24Dropdown style={this.state.editHistory ? {opacity: ".2"} : ""} onClick={() => !this.state.editHistory ? this.setState({openHistory: false}) : undefined} width={35} height={35}/>
                                            :
                                            <Icon24Chevron style={this.state.spinner || this.state.historyList.length < 1 ? {opacity: ".2"} : ""} onClick={() => this.state.spinner || this.state.historyList.length < 1 ? undefined : this.setState({openHistory: true, editHistory: false})} width={35} height={35}/>
                                    }
                                </div>
                            </div>
                            {
                                this.state.openHistory ?
                                    this.state.historyList.length > 0 || this.state.editHistory ?
                                        <Group style={{marginTop: "20px"}}>
                                            <Separator/>
                                            <Header level="secondary" aside={this.state.editHistory ?
                                                <div style={{display: "flex"}}>
                                                    <Icon24Cancel onClick={() => this.setState({historyList: this.state.backup, editHistory: false})} style={{marginRight: "5px"}}/>
                                                    <Icon24DoneOutline onClick={() => {
                                                        this.setState({editHistory: false, openHistory: !this.state.historyList.length <= 0});
                                                        this.saveHistory();
                                                    }}/>
                                                </div>
                                                : <Icon24Write onClick={() => this.setState({editHistory: true, backup: this.state.historyList})}/>}>
                                                История запросов
                                            </Header>
                                            <List>
                                                {
                                                    this.state.editHistory ?
                                                        this.state.historyList.map((item, index) => (
                                                            <Cell key={item} draggable
                                                                  removable
                                                                  onDragFinish={({from, to}) => {
                                                                      const historyList = [...this.state.historyList];
                                                                      historyList.splice(from, 1);
                                                                      historyList.splice(to, 0, this.state.historyList[from]);
                                                                      this.setState({historyList});
                                                                  }}
                                                                  onRemove={async () => {
                                                                      await this.setState({historyList: [...this.state.historyList.slice(0, index), ...this.state.historyList.slice(index + 1)]});
                                                                  }}
                                                            >{item}</Cell>
                                                        ))
                                                        :
                                                        this.state.historyList.map((item) => (
                                                            <Cell key={item} onClick={async () => {
                                                                await this.setState({nickname: item, openHistory: false});
                                                                await this.onClick();
                                                            }}>{item}</Cell>
                                                        ))
                                                }
                                            </List>
                                            <Separator/>
                                        </Group>
                                        :
                                        undefined
                                    :
                                    undefined
                            }
                        </FormLayoutGroup>
                        <Button disabled={!(this.state.nickname.length > 1 && this.state.nickname.match('^[A-Za-z0-9_]+$') && !this.state.spinner && !this.state.editHistory)} onClick={this.onClick.bind(this)} size='xl'>
                            <b>Получить информацию</b>
                        </Button>
                        {
                            this.state.spinner && <Spinner/>
                        }
                        {
                            this.state.skin &&
                                <Group top={`Скин игрока ${this.state.username}`}>
                                    <Separator/>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Skinview3d
                                            skinUrl={`https://stevecors.herokuapp.com/${this.state.skin}`}
                                            capeUrl={this.state.cape ? `https://stevecors.herokuapp.com/${this.state.cape}` : ""}
                                            height="196"
                                            width="196"
                                        />
                                    </div>
                                    <Separator/>
                                    <Div style={{ display: 'flex' }}>
                                        <Button disabled={this.state.lock} onClick={this.share.bind(this)} stretched before={this.state.lock ? <Icon24DoneOutline width={16} height={16}/> : <Icon24Message width={16} height={16} />}><b>{this.state.lock ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b></Button>
                                    </Div>
                                    <Separator/>
                                </Group>
                        }
                        <List top={this.state.username ? `История никнейма ${this.state.username}` : ""}>
                            {
                                this.state.list && this.state.list.map(({username, changed_at}, i) =>
                                        <Cell key={i} description={changed_at !== undefined ? timeConvert(changed_at) : regDate ? regDate : 'Первый'}>
                                            {username}
                                        </Cell>
                                    ).reverse()
                            }
                        </List>
                        {
                            this.state.error && <Error error={this.state.error}/>
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
