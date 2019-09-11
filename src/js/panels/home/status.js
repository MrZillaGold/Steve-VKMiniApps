import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import { Offline, Online } from 'react-detect-offline';

import {checkStatus} from "../../services/_functions";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Spinner, Avatar, Group, Cell, List, Gallery, Div, Button } from "@vkontakte/vkui";


class StatusGet extends React.Component {

    state = {
        spinner: true,
        error: null,
        status: null
    };

    statusGet() {
        axios.get(`https://stevecors.herokuapp.com/https://status.mojang.com/check`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                this.setState({ status: data, spinner: false });
            })
            .catch(err => {
                this.setState({ spinner: false });
                if (err) {
                    this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
                    return console.log(err);
                }
            });
    }

    render() {
        const {id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Состояние серверов">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    { this.state.spinner === false ?
                        ''
                        :
                        <Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {this.statusGet()}
                            <Spinner size='large' style={{ marginTop: 20 }} />
                        </Div>
                    }
                    {
                        this.state.status === null ?
                            ''
                            :
                            <Group title="Список серверов">
                                <List>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[0]['minecraft.net']).img}/>}
                                        description={checkStatus(this.state.status[0]['minecraft.net']).text}
                                    >
                                        Minecraft.net
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[4]['sessionserver.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[4]['sessionserver.mojang.com']).text}
                                    >
                                        Сервер Multiplayer-сессий
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[2]['account.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[2]['account.mojang.com']).text}
                                    >
                                        Сервер аккаунтов Mojang
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[3]['authserver.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[3]['authserver.mojang.com']).text}
                                    >
                                        Сервер авторизации
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[5]['api.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[5]['api.mojang.com']).text}
                                    >
                                        API Mojang
                                    </Cell>
                                    <Cell
                                        before={
                                            <Avatar src={checkStatus(this.state.status[6]['textures.minecraft.net']).img}/>}
                                        description={checkStatus(this.state.status[6]['textures.minecraft.net']).text}
                                    >
                                        Сервер скинов Minecraft
                                    </Cell>
                                </List>
                            </Group>
                    }
                    {
                        this.state.error === null ?
                            '' :
                            <Group>
                                <List>
                                    <Cell align='center'><b>Упс...</b></Cell>
                                </List>
                                <p style={{ color: '#909499', textAlign: 'center' }}>{this.state.error}</p>
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

export default connect(null, mapDispatchToProps)(StatusGet);
