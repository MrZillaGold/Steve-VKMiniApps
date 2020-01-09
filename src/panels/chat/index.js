import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Offline, Online } from 'react-detect-offline';
import {Panel, PanelHeader, PanelHeaderContent, HeaderButton, Tabs, TabsItem, Group, Snackbar, Avatar} from "@vkontakte/vkui";
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';

import OfflineBlock from '../components/offline';
import Error from "../components/error";
import HeaderButtons from "../components/headerbuttons";
import Servers from "./servers";
import Accounts from "./accounts";
import {resizeWindow} from "../../services/_functions";

class MinecraftChat extends React.Component {

    state = {
        tab: "servers",
        servers: null,
        accounts: null,
        socket: null
    };

    async componentDidMount() {
        await axios.get("https://stevecors.herokuapp.com/https://stevesocket.herokuapp.com")
            .then(() => {
                const socket = io("https://stevesocket.herokuapp.com");
                if (socket && socket.connected) {
                    socket.emit('server:disconnect');
                } else {
                    socket.emit('connect');
                }
                this.setState({ socket });
            })
            .catch((err) => {
                console.log(err);
                this.setState({unavaible: true})
            });
        resizeWindow(600);
    }

    login(serverData, accountData, navigator) {
        let server = {
            host: serverData.ip,
            port: serverData.port,
            version: serverData.version
        };
        let account;
        if (this.state.socket && this.state.socket.connected) {
            if (accountData.type === "license") {
                account = {
                    method: 'session',
                    session: accountData.session,
                }
            } else {
                account = {
                    method: 'pirate',
                    username: accountData.username
                }
            }
            this.state.socket.emit('server:connect', Object.assign(server, account));
            navigator.go("server-chat", {socket: this.state.socket})
        }
    }

    error = (text) => {
        if (this.state.error) return;
        this.setState({ error:
                <Snackbar
                    duration={2000}
                    layout="vertical"
                    onClose={() => this.setState({ error: null })}
                    before={<Avatar size={24} style={{backgroundColor: "#e64646"}}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                >
                    {text}
                </Snackbar>
        });
    };

    editTab = (tab) => {
        this.setState({tab: tab});
        this.error("Активируйте аккаунт, либо добавьте новый!")
    };

    render() {
        const {id, navigator} = this.props;

        if (this.state.socket) {
            this.state.socket.on('connect', () => {
                this.setState({connected: true});
            });
            this.state.socket.on('disconnect', () => {
                this.setState({connected: false});
            });
        }

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Чат">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                {
                    !this.state.unavaible ?
                        <div>
                            <Online>
                                <div>
                                    <Group>
                                        <Tabs type="buttons">
                                            <TabsItem
                                                onClick={() => this.setState({tab: 'servers'})}
                                                selected={this.state.tab === 'servers'}
                                            >
                                                Сервера
                                            </TabsItem>
                                            <TabsItem
                                                onClick={() => this.setState({tab: 'accounts'})}
                                                selected={this.state.tab === 'accounts'}
                                            >
                                                Аккаунты
                                            </TabsItem>
                                        </Tabs>
                                    </Group>
                                    <div>
                                        {
                                            this.state.tab === "servers" &&
                                            <Servers socket={this.state.socket} navigator={navigator} error={this.error} connect={this.login} editTab={this.editTab} visible={this.state.connected}/>
                                        }
                                        {
                                            this.state.tab === "accounts" &&
                                            <Accounts socket={this.state.socket} navigator={navigator} error={this.error} visible={this.state.connected}/>
                                        }
                                    </div>
                                    {this.state.error}
                                </div>
                            </Online>
                            <Offline>
                                <OfflineBlock/>
                            </Offline>
                        </div>
                        :
                        <Error error="Чат недоступен :( Попробуйте позже."/>
                }
            </Panel>
        );
    }
}

export default MinecraftChat;
