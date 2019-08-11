import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import { Offline, Online } from 'react-detect-offline';

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
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";


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
            if (err) {
                this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
                return console.log(`Произошла ошибка: ${err}, может об этом нужно куда-то сообщить?`);
            }
        });
    }

    render() {
        const {id, goBack} = this.props;
        const good = 'https://s3.amazonaws.com/assets.mojang.com/Happy-Server.gif';
        const mellow = 'https://s3.amazonaws.com/assets.mojang.com/Mellow-Server.gif';
        const bad = 'https://s3.amazonaws.com/assets.mojang.com/Sad-Server.gif';
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
                                        before={<Avatar src={this.state.status[0]['minecraft.net'] === 'green' ?
                                            good : this.state.status[0]['minecraft.net'] === 'yellow' ? mellow : bad
                                        }/>}
                                        description={
                                            this.state.status[0]['minecraft.net'] === 'green' ?
                                                'Всё в порядке' : this.state.status[0]['minecraft.net'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >Minecraft.net
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={this.state.status[4]['sessionserver.mojang.com'] === 'green' ?
                                            good : this.state.status[4]['sessionserver.mojang.com'] === 'yellow' ? mellow : bad
                                        }/>}
                                        description={this.state.status[4]['sessionserver.mojang.com'] === 'green' ?
                                            'Всё в порядке' : this.state.status[4]['sessionserver.mojang.com'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >Сервер Multiplayer-сессий
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={this.state.status[2]['account.mojang.com'] === 'green' ?
                                            good : this.state.status[2]['account.mojang.com'] === 'yellow' ? mellow : bad
                                        }/>}
                                        description={this.state.status[2]['account.mojang.com'] === 'green' ?
                                            'Всё в порядке' : this.state.status[2]['account.mojang.com'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >Сервер аккаунтов Mojang
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={this.state.status[3]['authserver.mojang.com'] === 'green' ?
                                            good : this.state.status[3]['authserver.mojang.com'] === 'yellow' ? mellow : bad
                                        }/>}
                                        description={this.state.status[3]['authserver.mojang.com'] === 'green' ?
                                            'Всё в порядке' : this.state.status[3]['authserver.mojang.com'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >Сервер авторизации
                                    </Cell>
                                    <Cell
                                        before={<Avatar src={this.state.status[5]['api.mojang.com'] === 'green' ?
                                            good : this.state.status[5]['api.mojang.com'] === 'yellow' ? mellow : bad
                                        }/>}
                                        description={this.state.status[5]['api.mojang.com'] === 'green' ?
                                            'Всё в порядке' : this.state.status[5]['api.mojang.com'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >API Mojang
                                    </Cell>
                                    <Cell
                                        before={
                                            <Avatar src={this.state.status[6]['textures.minecraft.net'] === 'green' ?
                                                good : this.state.status[6]['textures.minecraft.net'] === 'yellow' ? mellow : bad
                                            }/>}
                                        description={this.state.status[6]['textures.minecraft.net'] === 'green' ?
                                            'Всё в порядке' : this.state.status[6]['textures.minecraft.net'] === 'yellow' ? 'Небольшие неполадки' : 'Проблемы с доступностью'
                                        }
                                    >Сервер скинов Minecraft
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

export default connect(null, mapDispatchToProps)(StatusGet);
