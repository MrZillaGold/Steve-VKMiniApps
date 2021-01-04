import React from "react";
import { Avatar, PanelHeaderBack, PanelHeaderContent, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28MoonOutline, Icon28SunOutline } from "@vkontakte/icons";

import { IconSteve } from "../icons/icons";

import { useAppearance } from "../hooks";
import { router } from "../router";

export function CustomPanelHeader({ status, left = true }) {

    const { scheme, toggleScheme } = useAppearance();

    return (
        <PanelHeader left={
            left && <PanelHeaderBack onClick={router.back} />
        }
                     right={
                         <PanelHeaderButton onClick={toggleScheme}>
                             {
                                 scheme === "bright_light" ?
                                     <Icon28MoonOutline/>
                                     :
                                     <Icon28SunOutline/>
                             }
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
