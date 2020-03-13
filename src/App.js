import React from 'react';
import { Stack, Page } from "vkui-navigator/dist";

import Home from './panels/home';
import Server from './panels/server';
import User from './panels/user';
import Status from './panels/status';
import Achievements from './panels/achievements/achievements';
/*import SelectIcon from "./panels/achievements/selectIcon";*/

import Calculator from './panels/calculator';
import EnderCalculator from './panels/endercalculator';

import MinecraftChat from './panels/chat/index';
import AddServer from "./panels/chat/components/addserver";
import AddAccount from "./panels/chat/components/addaccount";
import ServerChat from './panels/chat/chatpanel';
import EditServer from "./panels/chat/components/editserver";

class App extends React.Component {

    render() {
        return (
            <Stack webviewType="vkapps"
                activePage="main"
                modals={[
                    <AddServer
                        id="add-server"
                        title="Добавление сервера"
                    />,
                    <EditServer
                        id="edit-server"
                        title="Редактирование"
                    />,
                    <AddAccount
                        id="add-account"
                        title="Добавление аккаута"
                    />
                ]}>
                <Page header={false} id="main" activePanel="home">
                    <Home id="home"/>
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
