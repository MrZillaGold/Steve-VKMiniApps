import React from 'react';
import {IOS, platform} from "@vkontakte/vkui";
import IconArrowAndroid from "./icons/arrowAndroid";
import IconArrowIOS from "./icons/arrowIOS";

class HeaderButtons extends React.Component {
    render() {
        return (
            platform() === IOS ?
                <IconArrowIOS/>
                :
                <IconArrowAndroid/>
        );
    }
}

export default HeaderButtons;
