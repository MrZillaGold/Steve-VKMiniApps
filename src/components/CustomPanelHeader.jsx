import React from "react";

import { Avatar, PanelHeaderButton, PanelHeaderContent, PanelHeader } from "@vkontakte/vkui";

import { HeaderButtons } from "./components";
import { IconSteve } from "../icons/icons";

export function CustomPanelHeader({ navigator, status, left }) {
    return (
        <PanelHeader separator={false}
                     left={
                         left &&
                         <PanelHeaderButton onClick={() => navigator.goBack()}>
                             <HeaderButtons/>
                         </PanelHeaderButton>
                     }
        >
            <PanelHeaderContent status={status}
                                before={
                                    <Avatar id="steve-head"
                                            size={36}
                                            shadow={false}
                                    >
                                        <IconSteve/>
                                    </Avatar>
                                }
            >
                Steve
            </PanelHeaderContent>
        </PanelHeader>
    )
}
