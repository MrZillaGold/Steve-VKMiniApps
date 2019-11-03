import React from 'react';
import io from 'socket.io-client';
import { Offline, Online } from 'react-detect-offline';
import {Panel, PanelHeader, PanelHeaderContent, HeaderButton, Tabs, TabsItem, Group, Snackbar, Avatar} from "@vkontakte/vkui";
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';

import OfflineBlock from '../components/offline';
import HeaderButtons from "../components/headerbuttons";
import Servers from "./servers";
import Accounts from "./accounts";
const socket = io("https://stevesocket.herokuapp.com");

class MinecraftChat extends React.Component {

    state = {
        tab: "servers",
        servers: null,
        accounts: null,
        socket: null
    };

    componentDidMount() {
        this.setState({ socket });
        if (socket && socket.connected) {
            socket.emit('server:disconnect');
            this.setState({connect: true});
        }
    }

    login(serverData, accountData, navigator) {
        let server = {
            host: serverData.ip,
            port: serverData.port,
            version: serverData.version
        };
        let account;
        if (socket && socket.connected) {
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
            socket.emit('server:connect', Object.assign(server, account));
            navigator.go("server-chat", {socket: socket})
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

        socket.on('disconnect', () => {
            this.setState({connect: false});
        });

        socket.on('connect', () => {
            this.setState({connect: true});
        });

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Чат">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    {
                        this.state.connect ?
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
                                        this.state.tab === "servers" ?
                                            <Servers socket={this.state.socket} navigator={navigator} error={this.error}
                                                     connect={this.login} editTab={this.editTab}/>
                                            :
                                            undefined
                                    }
                                    {
                                        this.state.tab === "accounts" ?
                                            <Accounts socket={this.state.socket} navigator={navigator} error={this.error}/>
                                            :
                                            undefined
                                    }
                                </div>
                                {this.state.error}
                            </div>
                            :
                            <OfflineBlock/>
                    }
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }
}

export default MinecraftChat;
