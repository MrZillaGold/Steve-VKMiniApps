import React from "react";

import { IOS, platform } from "@vkontakte/vkui";

import { IconArrowAndroid, IconArrowIOS } from "../icons/icons";

export function HeaderButtons() {
    return (
        platform() === IOS ?
            <IconArrowIOS/>
            :
            <div style={{ padding: "12px" }}>
                <IconArrowAndroid/>
            </div>
    )
}
