import React, { useEffect, useState } from "react";
import getArgs from "vkappsutils/dist/Args";
import VKBridge from "@vkontakte/vk-bridge";
import { ConfigProvider, AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { ModalsContext } from "vkui-navigation";

import { Layout } from "./Layout";

import { SchemeContext, schemes } from "./hooks/hooks";

export function App() {
    const getStorageScheme = () => {
        const storageScheme = localStorage.getItem("scheme");
        if (schemes.includes(storageScheme)) {
            return storageScheme;
        } else {
            return null;
        }
    };

    const [platform, setPlatform] = useState("android");
    const [scheme, setScheme] = useState(getStorageScheme() || "bright_light");

    const toggleScheme = () => {
        const newScheme = scheme === "bright_light" ? "space_gray" : "bright_light";

        setScheme(newScheme);

        localStorage.setItem("scheme", newScheme);
    };

    const [activeModal, setActiveModal] = useState(null);
    const [modalsHistory, setModalsHistory] = useState([]);

    const openModal = (modalId, params = {}) => {
        const modal = {
            id: modalId,
            params
        };

        setActiveModal(modal);
        setModalsHistory(
            modalsHistory.concat(modal)
        );
    };
    const closeModal = () => {
        const history = modalsHistory.slice(0, modalsHistory.length - 1);

        setModalsHistory(history);

        setActiveModal(
            history[history.length - 1] || null
        );
    };
    const closeModals = () => {
        setActiveModal(null);
        setModalsHistory([]);
    };

    const { platform: appPlatform } = getArgs();

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
    }, []);

    return (
        <SchemeContext.Provider value={{
            scheme,
            toggleScheme
        }}>
            <ModalsContext.Provider value={{
                activeModal,
                modalsHistory,
                openModal,
                closeModal,
                closeModals
            }}>
                <ConfigProvider webviewType={appPlatform === "desktop_web" || appPlatform === "web" ? "internal" : "vkapps"}
                                isWebView={VKBridge.isWebView()}
                                platform={platform}
                                scheme={scheme}
                >
                    <AdaptivityProvider>
                        <AppRoot>
                            <Layout setPlatform={setPlatform}/>
                        </AppRoot>
                    </AdaptivityProvider>
                </ConfigProvider>
            </ModalsContext.Provider>
        </SchemeContext.Provider>
    )
}
