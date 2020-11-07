import React, { useContext, useEffect, useState } from "react";
import { ModalPage, PanelHeaderButton, ModalPageHeader, ANDROID, VKCOM, ConfigProviderContext, Card, Div } from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from "@vkontakte/icons";
import { ModalsContext } from "vkui-navigation";

import { SkinPreview } from "../../components/SkinPreview";

export const galleryPreview = {
    id: "gallery-preview",
    content: GalleryPreview
};

function GalleryPreview({ id }) {

    const { activeModal, closeModal } = useContext(ModalsContext);
    const { platform } = useContext(ConfigProviderContext);

    const [{ skin, isSlim }, setParams] = useState({});

    useEffect(() => {
        setParams(activeModal.params);
    }, []);

    return (
        <ModalPage id={id}
                   header={
                       <ModalPageHeader
                           right={
                               <PanelHeaderButton onClick={closeModal}>
                                   {
                                       (platform === ANDROID || platform === VKCOM) ?
                                           <Icon24Cancel/>
                                           :
                                           <Icon24Dismiss/>
                                   }
                               </PanelHeaderButton>
                           }
                       >
                           Просмотр скина
                       </ModalPageHeader>
                   }
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
