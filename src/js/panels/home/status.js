import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import { Offline, Online } from 'react-detect-offline';
import OfflineBlock from './offline';

import {checkStatus} from "../../services/_functions";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Avatar, Group, Cell, List, Gallery } from "@vkontakte/vkui";


class StatusGet extends React.Component {

    state = {
        spinner: true,
        error: false,
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
                this.setState({ error: `Произошла ошибка. Попробуйте позже.`, spinner: false });
                return console.log(err);
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
                    { this.state.spinner ?
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {this.statusGet()}
                            <img src={require('./img/loading.svg')} alt="Загрузка..." style={{ marginTop: 50, height: '100px', width: '100px' }} />
                        </div>
                        :
                        ""
                    }
                    {
                        this.state.status ?
                            <Group title="Список серверов">
                                <List>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[0]['minecraft.net']).img}/>}
                                        description={checkStatus(this.state.status[0]['minecraft.net']).text}
                                    >
                                        Minecraft.net
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[1]['session.minecraft.net']).img}/>}
                                        description={checkStatus(this.state.status[1]['session.minecraft.net']).text}
                                    >
                                        Сессии Minecraft
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[2]['account.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[2]['account.mojang.com']).text}
                                    >
                                        Аккаунты Mojang
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[3]['authserver.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[3]['authserver.mojang.com']).text}
                                    >
                                        Авторизация Mojang
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={checkStatus(this.state.status[4]['sessionserver.mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[4]['sessionserver.mojang.com']).text}
                                    >
                                        Сессии Mojang
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
                                        Текстуры/Скины Minecraft
                                    </Cell>
                                    <Cell
                                        before={
                                            <Avatar src={checkStatus(this.state.status[7]['mojang.com']).img}/>}
                                        description={checkStatus(this.state.status[7]['mojang.com']).text}
                                    >
                                        Mojang.com
                                    </Cell>
                                </List>
                            </Group>
                            :
                            ""
                    }
                    {
                        this.state.error ?
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
                            :
                            ""
                    }
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

export default connect(null, mapDispatchToProps)(StatusGet);
