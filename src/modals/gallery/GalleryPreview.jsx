import React, { useState } from "react";
import { ModalPage, PanelHeaderButton, ModalPageHeader, ANDROID, VKCOM, Card, Div, IOS, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from "@vkontakte/icons";

import { SkinPreview } from "../../components/SkinPreview";

import { useAppearance } from "../../hooks";
import { router } from "../../router";

export const galleryPreview = {
    id: "gallery-preview",
    content: GalleryPreview
};

function GalleryPreview({ id }) {

    const { platform } = useAppearance();
    const { viewWidth } = useAdaptivity();

    const [{ skin, isSlim }] = useState(router.getState().params);

    return (
        <ModalPage id={id}
                   header={
                       <ModalPageHeader
                           right={
                               platform === IOS && viewWidth < ViewWidth.SMALL_TABLET &&
                               <PanelHeaderButton onClick={router.closeModal}>
                                   <Icon24Dismiss/>
                               </PanelHeaderButton>
                           }
                           left={
                               (platform === ANDROID || platform === VKCOM) && viewWidth < ViewWidth.SMALL_TABLET &&
                               <PanelHeaderButton onClick={router.closeModal}>
                                   <Icon24Cancel/>
                               </PanelHeaderButton>
                           }
                       >
                           Просмотр скина
                       </ModalPageHeader>
                   }
                   onClose={router.closeModal}
        >
            <Div style={{ padding: "0px 12px 16px" }}>
                <Card mode="tint">
                    <SkinPreview skin={skin}
                                 isSlim={isSlim}
                    />
                </Card>
            </Div>
        </ModalPage>
    )
}
