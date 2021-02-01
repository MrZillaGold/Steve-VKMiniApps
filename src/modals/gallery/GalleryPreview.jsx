import React from "react";
import { ModalPage, PanelHeaderButton, ModalPageHeader, ANDROID, VKCOM, Card, Div, IOS, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon24Dismiss, Icon24Cancel } from "@vkontakte/icons";
import { useParams, useRouter } from "@unexp/router";

import { SkinPreview } from "../../components/SkinPreview";
import { useAppearance } from "../../hooks";

export function GalleryPreview({ id }) {

    const { platform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { skin, isSlim } = useParams();
    const { back } = useRouter();

    return (
        <ModalPage id={id}
                   header={
                       <ModalPageHeader
                           right={
                               platform === IOS && viewWidth < ViewWidth.SMALL_TABLET &&
                               <PanelHeaderButton onClick={back}>
                                   <Icon24Dismiss/>
                               </PanelHeaderButton>
                           }
                           left={
                               (platform === ANDROID || platform === VKCOM) && viewWidth < ViewWidth.SMALL_TABLET &&
                               <PanelHeaderButton onClick={back}>
                                   <Icon24Cancel/>
                               </PanelHeaderButton>
                           }
                       >
                           Просмотр скина
                       </ModalPageHeader>
                   }
                   onClose={back}
        >
            <Div style={{ padding: "0px 12px 16px" }}>
                <Card mode="tint">
                    <SkinPreview skin={skin}
                                 isSlim={isSlim}
                    />
                </Card>
            </Div>
        </ModalPage>
    );
}
