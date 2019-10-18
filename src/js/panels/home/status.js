import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import {Panel, PanelHeader, PanelHeaderContent, Avatar, Group, Cell, List, HeaderButton} from "@vkontakte/vkui";
import { Offline, Online } from 'react-detect-offline';
import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import {checkStatus} from "../../services/_functions";

import OfflineBlock from './components/offline';
import Spinner from './components/spinner';
import Error from './components/error';
import HeaderButtons from "./components/headerbuttons";

class StatusGet extends React.Component {

    state = {
        spinner: true,
        status: null
    };


    componentDidMount() {
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
                <PanelHeader transparent left={<HeaderButton onClick={() => goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Состояние серверов">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    { this.state.spinner ?
                        <Spinner />
                        :
                        undefined
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
                            undefined
                    }
                    {
                        this.state.error ?
                            <Error error={this.state.error} stretch/>
                            :
                            undefined
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
