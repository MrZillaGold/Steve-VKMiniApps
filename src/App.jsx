import React, { useEffect, useState } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { ModalsContext } from "vkui-navigation";

import { Layout } from "./Layout";

import { useAppearance } from "./hooks";

export function App() {

    const { setScheme, appPlatform } = useAppearance();
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
        <ModalsContext.Provider value={{
            activeModal,
            modalsHistory,
            openModal,
            closeModal,
            closeModals
        }}>
            <AdaptivityProvider>
                <AppRoot>
                    <Layout/>
                </AppRoot>
            </AdaptivityProvider>
        </ModalsContext.Provider>
    )
}
