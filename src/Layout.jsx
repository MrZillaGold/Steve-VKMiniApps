import React, { useEffect } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, View, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";
import { useRouter, useStructure, useSwipeBack } from "@unexp/router";

// Панели
import { Home, User, Server, Gallery, Servers, Hypixel, Generator, Calculator, Status } from "./panels";
// Модалки
import { GalleryPreview, ServerPreview } from "./modals";
//

import { useAppearance } from "./hooks";

export function Layout() {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { popout, view, modal, panel } = useStructure({ view: "home", panel: "home" });
    const { back } = useRouter();

    useEffect(() => {
        setPlatform(viewWidth === ViewWidth.DESKTOP ? "android" : platform());
    }, []);

    return (
        <SplitLayout header={
            viewWidth >= ViewWidth.SMALL_TABLET && <PanelHeader separator={false}/>
        }
                     modal={
                         <ModalRoot activeModal={modal}
                                    onClose={back}
                         >
                             <GalleryPreview id="gallery-preview"/>
                             <ServerPreview id="server-preview"/>
                         </ModalRoot>
                     }
                     activeView={view}
                     popout={popout}
        >
            <SplitCol spaced={viewWidth > ViewWidth.MOBILE}
                      animate={viewWidth < ViewWidth.SMALL_TABLET}
            >
                <View id="home"
                      activePanel={panel}
                      {...useSwipeBack()}
                >
                    <Home id="home"/>
                    <User id="user"/>
                    <Server id="server"/>
                    <Gallery id="gallery"/>
                    <Servers id="servers"/>
                    <Hypixel id="hypixel"/>
                    <Generator id="generator"/>
                    <Calculator id="calculator"/>
                    <Status id="status"/>
                </View>
            </SplitCol>
        </SplitLayout>
    );
}
