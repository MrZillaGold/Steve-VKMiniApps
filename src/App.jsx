import React, { useEffect } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";

import { Layout } from "./Layout";

import { useAppearance } from "./hooks";

export function App() {

    const { setScheme, appPlatform } = useAppearance();

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

                if (appPlatform !== "desktop_web") {
                    setScheme(scheme);
                }
            }
        });

        window.Twitch.ext.onContext(({ theme }) => {
            const scheme = theme === "light" ? "bright_light" : "space_gray";

            setScheme(scheme);
        });
    }, []);

    return (
        <AdaptivityProvider>
            <AppRoot>
                <Layout/>
            </AppRoot>
        </AdaptivityProvider>
    )
}
