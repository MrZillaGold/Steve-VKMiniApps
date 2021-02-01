import React, { useEffect } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, View, Root, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";
import { useRouter, useStructure, useSwipeBack } from "@unexp/router";

// Панели
import { Home, User, Server, Gallery, Hypixel, Generator, Calculator, Status, } from "./panels";
// Модалки
import { GalleryPreview } from "./modals";
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

    const root = (
        <Root modal={
                  <ModalRoot activeModal={modal}
                             onClose={back}
                  >
                      <GalleryPreview id="gallery-preview"/>
                  </ModalRoot>
              }
              activeView={view}
              popout={popout}
        >
            <View id="home"
                  activePanel={panel}
                  {...useSwipeBack()}
            >
                <Home id="home"/>
                <User id="user"/>
                <Server id="server"/>
                <Gallery id="gallery"/>
                <Hypixel id="hypixel"/>
                <Generator id="generator"/>
                <Calculator id="calculator"/>
                <Status id="status"/>
            </View>
        </Root>
    );

    if (viewWidth > ViewWidth.MOBILE) {
        return (
            <SplitLayout header={
                <PanelHeader separator={false}/>
            }>
                <SplitCol spaced={true}>
                    {
                        root
                    }
                </SplitCol>
            </SplitLayout>
        )
    } else {
        return root;
    }
}
