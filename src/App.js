import React from 'react';
import { Stack, Page } from "vkui-navigator/dist";

import Base from './js/panels/home/base';
import Server from './js/panels/home/server';
import User from './js/panels/home/user';
import Status from './js/panels/home/status';
import Achievements from './js/panels/home/achievements';
import Calculator from './js/panels/home/calculator';
import EnderCalculator from './js/panels/home/endercalculator';

import MinecraftChat from './js/panels/home/chat/index';
import AddServer from "./js/panels/home/chat/components/addserver";
import AddAccount from "./js/panels/home/chat/components/addaccount";
import ServerChat from './js/panels/home/chat/chatpanel';

class App extends React.Component {

    state = {
        eruda: false
    };

    eruda = async () => {
        await this.setState({eruda: !this.state.eruda});
        this.state.eruda ? window.eruda.init() : window.eruda.destroy()
    };

    hash() {
        if (window.location.hash) {
            const hash = window.location.hash.match(/#(.+?)(?:=([^]+)|$)/);
            const panels = ["user", "server", "status", "achievements", "calculator", "endercalculator", "chat", "base"];
            if (hash[1] && panels.includes(hash[1])) {
                if (hash[1] === "user" && hash[2] && hash[2].match(/^[A-Za-z0-9_]{3,16}$/g)) {
                    return {panel: "user", data: hash[2]};
                } else {
                    return {panel: hash[1]};
                }
            } else {
                return {panel: "base"};
            }
        } else {
            return {panel: "base"};
        }
    }


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
                <Page id="main" activePanel={this.hash().panel}>
                    <Base id="base" eruda={this.eruda}/>
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
