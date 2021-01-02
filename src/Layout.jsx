import React, { useContext, useEffect } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";
import { Root, View } from "vkui-navigation";
import { ModalsContext } from "vkui-navigation";

// Панели
import { Home, User, Server, Gallery, Hypixel, Generator, Calculator, Status, } from "./panels";
// Модалки
import { galleryPreview } from "./modals/gallery/GalleryPreview";
import { useAppearance } from "./hooks";
//

const modals = [
    galleryPreview
];

export function Layout() {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { activeModal, closeModal } = useContext(ModalsContext);

    useEffect(() => {
        setPlatform(viewWidth === ViewWidth.DESKTOP ? "android" : platform());
    }, []);

    const root = (
        <Root homeView="home"
              modal={
                  <ModalRoot activeModal={
                      activeModal?.id || null
                  }
                             onClose={closeModal}
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
                  homePanel="home"
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
