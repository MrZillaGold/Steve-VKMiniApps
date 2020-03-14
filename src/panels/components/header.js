import React from "react";

import { Avatar, PanelHeaderButton, PanelHeaderContent, PanelHeaderSimple } from "@vkontakte/vkui";

import { HeaderButtons } from "./components";
import { IconSteve } from "./icons";

class PanelHeader extends React.Component {

    render() {
        const {navigator, status, left} = this.props;

        return (
            <PanelHeaderSimple separator={false}
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
            </PanelHeaderSimple>
        );
    }
}

export default PanelHeader;
