import React from 'react';
import { Stack, Page } from "vkui-navigator/dist";

import Home from './panels/home';
import Server from './panels/server';
import User from './panels/user';
import Status from './panels/status';
import Achievements from './panels/achievements';
import Calculator from './panels/calculator';
import EnderCalculator from './panels/endercalculator';

import MinecraftChat from './panels/chat/index';
import AddServer from "./panels/chat/components/addserver";
import AddAccount from "./panels/chat/components/addaccount";
import ServerChat from './panels/chat/chatpanel';

class App extends React.Component {

    state = {
        eruda: false
    };

    eruda = async () => {
        await this.setState({eruda: !this.state.eruda});
        this.state.eruda ? window.eruda.init() : window.eruda.destroy()
    };
    
    render() {
        return (
            <Stack
                activePage="main"
                modals={[
                    <AddServer
                        id="add-server"
                        title="Добавление сервера"
                    />,
                        <AddAccount
                            id="add-account"
                            title="Добавление аккаута"
                        />
                ]}>
                <Page id="main" activePanel="home">
                    <Home id="home" eruda={this.eruda}/>
                    <Server id="server"/>
                    <User id="user"/>
                    <Status id="status"/>
                    <Achievements id="achievements"/>
                    <Calculator id="calculator"/>
                    <EnderCalculator id="endercalculator"/>

                    <MinecraftChat id="chat"/>
                    <ServerChat id="server-chat"/>
                </Page>
            </Stack>
        );
    }
}

export default App;
