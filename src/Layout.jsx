import React, { useEffect, useState } from "react";
import { Root, View, PanelHeader, SplitCol, SplitLayout, ModalRoot, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";

// Панели
import { Home, User, Server, Gallery, Hypixel, Generator, Calculator, Status, } from "./panels";
// Модалки
import { galleryPreview } from "./modals/gallery/GalleryPreview";
//

import { useAppearance } from "./hooks";
import { router } from "./router";

const modals = [
    galleryPreview
];

export function Layout() {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();

    const [{ modal, page }, setRouterState] = useState(router.getState());

    useEffect(() => {
        setPlatform(viewWidth === ViewWidth.DESKTOP ? "android" : platform());

        router.subscribe(routerListener);
    }, []);

    const routerListener = ({ toState }) => {
        setRouterState(toState);
    };

    const root = (
        <Root activeView="home"
              modal={
                  <ModalRoot activeModal={
                      modal
                  }
                             onClose={router.closeModal}
                  >
                      {
                          modals.map(({ id, content: Modal }) =>
                              <Modal id={id}
                                     key={id}
                              />
                          )
                      }
                  </ModalRoot>
              }
        >
            <View id="home"
                  activePanel={page}
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
