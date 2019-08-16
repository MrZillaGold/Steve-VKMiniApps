import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import VKConnect from "@vkontakte/vkui-connect-promise";
import VKConnectOld from "@vkontakte/vkui-connect";

import { Offline, Online } from 'react-detect-offline';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import Icon24Message from '@vkontakte/icons/dist/24/message';

class UserGet extends React.Component {

    state = {
        nickname: '',
        username: null,
        spinner: null,
        error: null,
        list: null,
        skin: null,
        value: null
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    share () {
        VKConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098}).then(data => {
            if(data.type === "VKWebAppAllowMessagesFromGroupResult") {
                VKConnectOld.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"type":"document", "url": this.state.skin, "name": this.state.username}})
            }
        }).catch(error => console.log(error));
    }

    onClick () {
        if (this.state.nickname.length === 0){
            return this.setState({ value: 'error' });
        }
        this.setState({ spinner: true, list: null, username: null, error: null, value: null, skin: null });
        axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`).then(res => {
            return res.data;
        }).then(data => {
            this.setState({ list: data.username_history, username: data.username, skin: data.textures.skin.url, spinner: null });
        }).catch(err => {
            this.setState({ spinner: null });
            if (err.response.status === 404) {
                this.setState({ error: `Игрок с никнеймом ${this.state.nickname} не существует!` });
                return console.log(`Игрок с никнеймом ${this.state.nickname} не существует!`);
            }
            if (err.response.status === 400) {
                this.setState({ error: `Никнейм может содержать только латинские буквы, цифры и символ "_".` });
                return console.log(`Произошла ошибка 400 (Bad Request!), проверьте вводимые данные!`);
            }
            if (err) {
                this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
                return console.log(`Данная ошибка решается, репортить не нужно! ${err}`);
            }
        });
    }

    render() {
        const {nickname, id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Информация об игроке">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        <Input
                            top='Никнейм'
                            name='nickname'
                            value={nickname}
                            onChange={this.onChange.bind(this)}
                            status={this.state.value === 'error' ? 'error' : 'default'}
                            bottom={this.state.value === 'error' ? 'Пожалуйста, введите никнейм игрока' : 'Никнейм может содержать только латинские буквы, цифры и символ "_". (От 3-ёх до 16-ти символов)'}
                            placeholder="Введите никнейм"
                            maxLength='16'
                            pattern='^[A-Za-z0-9_]+$'
                        />
                        {
                            this.state.nickname.length > 2 && this.state.nickname.match('^[A-Za-z0-9_]+$') && this.state.spinner === null ?
                                <Button onClick={this.onClick.bind(this)} size='xl'>Посмотреть информацию</Button>
                                :
                                <Button disabled size='xl'>Посмотреть информацию</Button>
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
                                    <Button onClick={this.share.bind(this)} stretched before={<Icon24Message width={16} height={16} />}>Получить cкин в сообщения</Button>
                                </Div>
                            </Group>
                        }
                        <List top={this.state.username === null ? '' : `История никнейма ${this.state.username}`}>
                            {this.state.list === null ? '' : Array.prototype.map.call(this.state.list, function (item) {

                                let currentDate = new Date(item.changed_at);

                                let getDate = currentDate.getDate();
                                let getMonth = currentDate.getMonth() + 1;
                                let getYear = currentDate.getFullYear();

                                let month = getMonth > 9 ? getMonth : `0` + getMonth;
                                let date = getDate > 9 ? getDate : `0` + getDate;
                                let changed_at = date + '.' + month + '.' + getYear;

                                return <Cell key={item.username} description={item.changed_at !== undefined ? changed_at : 'Первый'}>
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
                                backgroundImage: 'url(https://psv4.userapi.com/c848424/u233731786/docs/d8/5b1e5e8f3fa5/Enderman.png)',
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
