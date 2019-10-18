import React from 'react';
import {IOS, platform} from "@vkontakte/vkui";

class HeaderButtons extends React.Component {
    render() {
        return (
            platform() === IOS ?
                <img className="arrow_icon" src={require('../img/arrowios.svg')} alt=""/>
                :
                <img className="arrow_icon" src={require('../img/arrowandroid.svg')} alt=""/>
        );
    }
}

export default HeaderButtons;
