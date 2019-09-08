import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import VKConnect from "@vkontakte/vk-connect-promise";
import VKConnectOld from "@vkontakte/vk-connect";

import {timeConvert} from "../../services/_functions";

import { Offline, Online } from 'react-detect-offline';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Input, FormLayout, Button, Spinner, Group, Cell, List, Gallery, Div } from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon16Done from '@vkontakte/icons/dist/16/done';

class UserGet extends React.Component {

    state = {
        nickname: '',
        username: null,
        spinner: null,
        error: null,
        list: null,
        skin: null,
        value: null,
        regDate: null,
        lock: false
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^A-Za-z0-9_]+$/g, "").slice(0, 16)});
    }

    onClick () {
        if (this.state.nickname.length === 0){
            return this.setState({ value: 'error' });
        }
        this.setState({ spinner: true, list: null, username: null, error: null, value: null, skin: null, regDate: null, lock: false });
        axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                this.setState({ list: data.username_history, username: data.username, skin: data.textures.skin.url, spinner: null });
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
        VKConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098}).then(data => {
            console.log(data);
            if(data.type === "VKWebAppAllowMessagesFromGroupResult") {
                this.setState({ lock: true });
                VKConnectOld.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"type":"document", "url": this.state.skin, "name": this.state.username}})
            }
        }).catch(error => console.log(error));
    }

    render() {
        const {id, goBack} = this.props;

        const {regDate} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Информация об игроке">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        { this.state.spinner === null ?
                            <Input
                                top='Никнейм'
                                name='nickname'
                                value={this.state.nickname}
                                onChange={this.onChange.bind(this)}
                                status={this.state.nickname.length > 2 || this.state.nickname === "" ? 'default' : 'error'}
                                bottom='Может содержать только латинские буквы, цифры и символ "_". (От 3 до 16 символов)'
                                placeholder="Введите никнейм"
                                maxLength='16'
                                pattern='^[A-Za-z0-9_]+$'
                            />
                            :
                            <Input
                                top='Никнейм'
                                name='nickname'
                                disabled
                                value={this.state.nickname}
                                bottom='Может содержать только латинские буквы, цифры и символ "_". (От 3 до 16 символов)'
                            />
                        }
                        {
                            this.state.nickname.length > 2 && this.state.nickname.match('^[A-Za-z0-9_]+$') && this.state.spinner === null ?
                                <Button onClick={this.onClick.bind(this)} size='xl'>Получить информацию</Button>
                                :
                                <Button disabled size='xl'>Получить информацию</Button>
                        }

                        { this.state.spinner === null ?
                            '' :
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <Spinner size='large' style={{ marginTop: 20 }} />
                            </div>
                        }
                        {
                            this.state.error === null ?
                                '' :
                                <Group>
                                    <List>
                                        <Cell align='center'><b>Упс...</b></Cell>
                                    </List>
                                    <p style={{ whiteSpace: 'pre-wrap', color: '#909499', textAlign: 'center' }}>{this.state.error}</p>
                                    <Gallery
                                        style={{ height: 200 }}
                                    >
                                        <div style={{
                                            backgroundImage: 'url(https://www.minecraft.net/content/dam/archive/0ef629a3446f9a977087c578189097dd-sticker_creeper.png)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: '50%',
                                            height: '200px',
                                            width: '100%',
                                            backgroundRepeat: 'no-repeat'}}
                                        />
                                    </Gallery>
                                </Group>
                        }
                        {this.state.skin === null ? '' :
                            <Group top={`Скин игрока ${this.state.username}`}>
                                <Div>
                                    <Gallery
                                        bullets="dark"
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '200px',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <div style={{
                                            backgroundImage: 'url(https://mc-heads.net/body/' + this.state.username + '/200)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            height: '200px',
                                            width: 'auto',
                                            display: 'block',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        />
                                        <div style={{
                                            backgroundImage: 'url(https://mc-heads.net/player/' + this.state.username + '/200)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            height: '200px',
                                            width: 'auto',
                                            display: 'block',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        />
                                        <div style={{
                                            backgroundImage: 'url(https://mc-heads.net/head/' + this.state.username + '/300)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            height: '200px',
                                            width: 'auto',
                                            display: 'block',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        />
                                        <div style={{
                                            backgroundImage: 'url(https://mc-heads.net/avatar/' + this.state.username + '/200)',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                            height: '200px',
                                            width: 'auto',
                                            display: 'block',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        />
                                    </Gallery>
                                </Div>
                                <Div style={{ display: 'flex' }}>
                                    { this.state.lock ?
                                        <Button disabled stretched before={<Icon16Done width={16} height={16} />}>Сообщение отправлено!</Button>
                                        :
                                        <Button onClick={this.share.bind(this)} stretched before={<Icon24Message width={16} height={16} />}>Получить cкин в сообщения</Button>
                                    }
                                </Div>
                            </Group>
                        }
                        <List top={this.state.username === null ? '' : `История никнейма ${this.state.username}`}>
                            {this.state.list === null ? '' : Array.prototype.map.call(this.state.list, function (item) {
                                return <Cell key={item.username} description={item.changed_at !== undefined ? timeConvert(item.changed_at) : regDate === null ? 'Первый' : regDate}>
                                    {item.username}
                                </Cell>
                            }).reverse()}
                        </List>
                    </FormLayout>
                </Online>
                <Offline>
                    <Div style={{ userSelect: 'none', marginTop: '56px' }}>
                        <Cell align='center'><b>Упс...</b></Cell>
                        <p style={{ whiteSpace: 'pre-wrap', color: '#909499', textAlign: 'center' }}>
                            Пропало подключение с сервером!<br /><br />Эта вкладка будет доступна как появится соединение.
                        </p>
                        <Button level='tertiary' stretched component='a' href='https://vk.com/stevebotmc'>Группа</Button>
                        <Gallery style={{ height: 200 }}>
                            <div style={{
                                backgroundImage: 'url(https://www.minecraft.net/content/dam/archive/0ef629a3446f9a977087c578189097dd-sticker_creeper.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: '50%',
                                backgroundRepeat: 'no-repeat'}}
                            />
                        </Gallery>
                    </Div>
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
