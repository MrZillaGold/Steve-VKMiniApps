import React, { useContext } from "react";
import { Avatar, PanelHeaderBack, PanelHeaderContent, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28MoonOutline } from "@vkontakte/icons";
import { useNavigator } from "vkui-navigation";

import { IconSteve } from "../icons/icons";

import { SchemeContext } from "../hooks/hooks";

export function CustomPanelHeader({ status, left = true }) {

    const { goBack } = useNavigator();
    const { toggleScheme } = useContext(SchemeContext);

    return (
        <PanelHeader left={
            left && <PanelHeaderBack onClick={goBack} />
        }
                     right={
                         <PanelHeaderButton onClick={toggleScheme}>
                             <Icon28MoonOutline/>
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
