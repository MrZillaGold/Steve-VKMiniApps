import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import Skinview3d from 'react-skinview3d'
import {fixInput} from "../../services/_functions";

import VKConnect from "@vkontakte/vk-connect";

import {timeConvert} from "../../services/_functions";

import { Offline, Online } from 'react-detect-offline';
import OfflineBlock from './offline';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, HeaderButton, PanelHeaderContent, Input, FormLayout, Button, Group, Cell, List, Div, Separator, platform, IOS } from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import "./spinner.css";

class UserGet extends React.Component {

    state = {
        nickname: '',
        list: false,
        skin: false,
        cape: false
    };

    onChange(e) {
        fixInput();
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 16)});
    }

    onClick () {
        if (this.state.nickname.length === 0){
            return this.setState({ value: 'error' });
        }
        this.setState({ spinner: true, list: false, username: false, error: false, value: false, skin: false, cape: false, regDate: false, lock: false });
        axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data.textures.cape) {
                    this.setState({ cape: data.textures.cape.url });
                }
                this.setState({ list: data.username_history, username: data.username, skin: data.textures.skin.url, spinner: null });
                console.log(`URL Скина: ${data.textures.skin.url}`);
                if (data.created_at) {
                    this.setState({ regDate: timeConvert(data.created_at) });
                }
            })
            .catch(err => {
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

    render() {
        const {id, goBack} = this.props;

        const {regDate} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => goBack()}>{platform() === IOS ? <img className="arrow_icon" src={require('./img/arrowios.svg')} alt=""/> : <img className="arrow_icon" src={require('./img/arrowandroid.svg')} alt=""/>}</HeaderButton>}>
                    <PanelHeaderContent status="Информация об игроке">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        <Input
                            top='Никнейм'
                            name='nickname'
                            disabled={this.state.spinner}
                            value={this.state.nickname}
                            onChange={this.onChange.bind(this)}
                            status={this.state.nickname.length > 2 || this.state.nickname === "" ? 'default' : 'error'}
                            bottom='Может содержать только латинские буквы, цифры и символ "_". (От 3 до 16 символов)'
                            placeholder="Введите никнейм"
                            maxLength='16'
                            pattern='^[A-Za-z0-9_]+$'
                        />
                        <Button disabled={!(this.state.nickname.length > 2 && this.state.nickname.match('^[A-Za-z0-9_]+$') && !this.state.spinner)} onClick={this.onClick.bind(this)} size='xl'>
                            <b>Получить информацию</b>
                        </Button>
                        {
                            this.state.spinner ?
                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                    <img src={require('./img/loading.svg')} alt="Загрузка..." style={{ marginTop: 50, height: '100px', width: '100px' }} />
                                </div>
                                :
                                ""
                        }
                        {
                            this.state.skin ?
                                <Group top={`Скин игрока ${this.state.username}`}>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Skinview3d
                                            skinUrl={`https://stevecors.herokuapp.com/${this.state.skin}`}
                                            capeUrl={this.state.cape ? `https://stevecors.herokuapp.com/${this.state.cape}` : ""}
                                            height="196"
                                            width="196"
                                        />
                                    </div>
                                    <Separator style={{ margin: '8px 0' }} />
                                    <Div style={{ display: 'flex' }}>
                                        <Button disabled={this.state.lock} onClick={this.share.bind(this)} stretched before={this.state.lock ? <Icon16Done/> : <Icon24Message width={16} height={16} />}><b>{this.state.lock ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b></Button>
                                    </Div>
                                </Group>
                                :
                                ""
                        }
                        <List top={this.state.username ? `История никнейма ${this.state.username}` : ""}>
                            {
                                this.state.list ? this.state.list.map(({username, changed_at}, i) =>
                                        <Cell key={i} description={changed_at !== undefined ? timeConvert(changed_at) : regDate ? regDate : 'Первый'}>
                                            {username}
                                        </Cell>
                                    ).reverse()
                                    :
                                    ""
                            }
                        </List>
                        {
                            this.state.error ?
                                <Group>
                                    <List>
                                        <Cell align='center'><b>Упс...</b></Cell>
                                    </List>
                                    <p className="error_text">{this.state.error}</p>
                                    <div className="error_image"/>
                                </Group>
                                :
                                ""
                        }
                    </FormLayout>
                </Online>
                <Offline>
                    <OfflineBlock />
                </Offline>
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(UserGet);
