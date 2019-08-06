import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import PanelHeaderContent from "@vkontakte/vkui/dist/components//PanelHeaderContent/PanelHeaderContent";
import Div from "@vkontakte/vkui/dist/components/Div/Div";


class StatusGet extends React.Component {

    state = {
        spinner: true,
        error: null,
        status: null
    };

    statusGet() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://status.mojang.com/check`).then(res => {
            return res.data;
        }).then(data => {
            this.setState({ status: data, spinner: false });
        }).catch(err => {
            this.setState({ spinner: false });
            if (err.response.status > 0 && err.response.status !== 200) {
                this.setState({ error: `Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?` });
                return console.log(`Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?`);
            }
        });
    }

    render() {
        const {id, goBack} = this.props;
        const good = 'https://s3.amazonaws.com/assets.mojang.com/Happy-Server.gif';
        const bad = 'https://s3.amazonaws.com/assets.mojang.com/Sad-Server.gif';
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Состояние серверов">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
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
                                    before={<Avatar src={this.state.status[0]['minecraft.net'] === 'green' ? good : bad}/>}
                                    description={this.state.status[0]['minecraft.net'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
                                    Minecraft.net
                                </Cell>
                                <Cell
                                    before={<Avatar src={this.state.status[4]['sessionserver.mojang.com'] === 'green' ? good : bad}/>}
                                    description={this.state.status[4]['sessionserver.mojang.com'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
                                    Сервер Multiplayer-сессий
                                </Cell>
                                <Cell
                                    before={<Avatar src={this.state.status[2]['account.mojang.com'] === 'green' ? good : bad}/>}
                                    description={this.state.status[2]['account.mojang.com'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
                                    Сервер аккаунтов Mojang
                                </Cell>
                                <Cell
                                    before={<Avatar src={this.state.status[3]['authserver.mojang.com'] === 'green' ? good : bad}/>}
                                    description={this.state.status[3]['authserver.mojang.com'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
                                    Сервер авторизации
                                </Cell>
                                <Cell
                                    before={<Avatar src={this.state.status[5]['api.mojang.com'] === 'green' ? good : bad}/>}
                                    description={this.state.status[5]['api.mojang.com'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
                                    API Mojang
                                </Cell>
                                <Cell
                                    before={<Avatar src={this.state.status[6]['textures.minecraft.net'] === 'green' ? good : bad}/>}
                                    description={this.state.status[6]['textures.minecraft.net'] === 'green' ? 'Всё в порядке' : 'Наблюдаются проблемы'}>
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

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusGet);