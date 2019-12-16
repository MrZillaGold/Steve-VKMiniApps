import React from 'react';
import {IOS, platform} from "@vkontakte/vkui";

class HeaderButtons extends React.Component {
    render() {
        return (
            platform() === IOS ?
                <img className="arrow_icon" src={require('../assets/arrowios.svg')} alt=""/>
                :
                <img className="arrow_icon" src={require('../assets/arrowandroid.svg')} alt=""/>
        );
    }
}

export default HeaderButtons;
