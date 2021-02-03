import React from "react";
import { ANDROID, IOS, ModalPageHeader, PanelHeaderButton, useAdaptivity, ViewWidth, VKCOM } from "@vkontakte/vkui";
import { Icon24Cancel, Icon24Dismiss } from "@vkontakte/icons";
import { useRouter } from "@unexp/router";

import { useAppearance } from "../hooks";

export function ModalHeader({ children }) {

    const { platform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    return (
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
            {
                children
            }
        </ModalPageHeader>
    );
}
