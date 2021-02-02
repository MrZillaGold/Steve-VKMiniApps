import React, { useState } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import getArgs from "vkappsutils/dist/Args";
import { ConfigProvider } from "@vkontakte/vkui";

import { AppearanceContext, schemes } from "../hooks";

export function AppearanceProvider({ children }) {

    const { platform: appPlatform } = getArgs();

    const getStorageScheme = () => {
        const storageScheme = localStorage.getItem("scheme");

        return schemes.includes(storageScheme) ? storageScheme : "bright_light";
    };

    const [scheme, setScheme] = useState(getStorageScheme());
    const [platform, setPlatform] = useState("android");

    const toggleScheme = () => {
        const newScheme = scheme === "bright_light" ? "space_gray" : "bright_light";

        setScheme(newScheme);

        localStorage.setItem("scheme", newScheme);
    };

    return (
        <AppearanceContext.Provider value={{
            scheme,
            platform,
            appPlatform,
            toggleScheme,
            setScheme,
            setPlatform
        }}>
            <ConfigProvider webviewType={appPlatform === "desktop_web" || appPlatform === "web" ? "internal" : "vkapps"}
                            isWebView={VKBridge.isWebView()}
                            scheme={scheme}
                            platform={platform}
            >
                {
                    children
                }
            </ConfigProvider>
        </AppearanceContext.Provider>
    );
}
