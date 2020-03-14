import React from 'react';

import { IOS, platform } from "@vkontakte/vkui";

import {IconArrowAndroid, IconArrowIOS} from "./icons";

class HeaderButtons extends React.Component {
    render() {
        return (
            platform() === IOS ?
                <IconArrowIOS/>
                :
                <div style={{height: "48px", padding: "12px"}}>
                    <IconArrowAndroid/>
                </div>
        );
    }
}

export default HeaderButtons;
