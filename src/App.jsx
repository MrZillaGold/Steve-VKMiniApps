import React, { useEffect, useState } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { Stack, Page } from "vkui-navigator/dist";

import { changeStatusBarColor } from "./bridge";

import { Home } from "./panels/Home";
import { ServerInfo } from "./panels/ServerInfo";
import { UserInfo } from "./panels/UserInfo";
import { HypixelStatistics } from "./panels/HypixelStatistics";
import { MojangStatus } from "./panels/MojangStatus";
import { AchievementGenerator } from "./panels/AchievementGenerator";
import { Calculator } from "./panels/Calculator";

export function App() {

    const [scheme, setScheme] = useState("bright_light");

    useEffect(() => {
        VKBridge.subscribe(({ detail: { type, data }}) => {
            if (type === "VKWebAppUpdateConfig") {
                const scheme = data.scheme ?
                    data.scheme === "client_light" ?
                        "bright_light"
                        :
                        data.scheme === "client_dark" ?
                            "space_gray"
                            :
                            data.scheme
                    : "bright_light";

                setScheme(scheme);

                changeStatusBarColor();
            }
            if (type === "VKWebAppViewRestore") {
                changeStatusBarColor();
            }
        });
    }, []);

    return (
        <Stack webviewType="vkapps"
               activePage="main"
               scheme={scheme}
               isWebView={VKBridge.isWebView()}
        >
            <Page id="main" activePanel="home">
                <Home id="home"/>
                <ServerInfo id="server" scheme={scheme}/>
                <UserInfo id="user" scheme={scheme}/>
                <HypixelStatistics id="hypixel" />
                <MojangStatus id="status"/>
                <AchievementGenerator id="achievements"/>
                <Calculator id="calculator"/>
            </Page>
        </Stack>
    )
}
