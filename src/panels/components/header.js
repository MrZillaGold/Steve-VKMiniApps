import React from "react";

import { Avatar, PanelHeaderButton, PanelHeaderContent, PanelHeader } from "@vkontakte/vkui";

import { HeaderButtons } from "./components";
import { IconSteve } from "./icons";

class CustomPanelHeader extends React.Component {

    render() {
        const {navigator, status, left} = this.props;

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
                                        >
                                            <IconSteve/>
                                        </Avatar>
                                    }
                >
                    Steve
                </PanelHeaderContent>
            </PanelHeader>
        );
    }
}

export default CustomPanelHeader;
