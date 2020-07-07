import React from 'react';
import { Stack, Page } from "vkui-navigator/dist"

import { Home } from "./panels/Home";
import { ServerInfo } from './panels/ServerInfo';
import { UserInfo } from './panels/UserInfo';
import { MojangStatus } from './panels/MojangStatus';
import { AchievementGenerator } from './panels/AchievementGenerator';
import { Calculator } from './panels/Calculator';

export function App() {
    return (
        <Stack webviewType="vkapps"
               activePage="main"
        >
            <Page id="main" activePanel="home">
                <Home id="home"/>
                <ServerInfo id="server"/>
                <UserInfo id="user"/>
                <MojangStatus id="status"/>
                <AchievementGenerator id="achievements"/>
                <Calculator id="calculator"/>
            </Page>
        </Stack>
    )
}
