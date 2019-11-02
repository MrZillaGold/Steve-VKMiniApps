import React from 'react';
import VKConnect from "@vkontakte/vk-connect";
import { Offline, Online } from 'react-detect-offline';
import {Panel, PanelHeader, PanelHeaderContent, HeaderButton, FixedLayout, Header} from "@vkontakte/vkui";

import OfflineBlock from '../components/offline';
import HeaderButtons from "../components/headerbuttons";
import Chat from "./components/chat";

import "./chat.scss";

class ServerChat extends React.Component {

    state = {
        tab: "chat"
    };

    componentDidMount() {
        VKConnect.send("VKWebAppDisableSwipeBack", {});
    }

    componentWillUnmount() {
        const {navigator} = this.props;
        if (navigator.params.socket && navigator.navigator.params.socket.connected) {
            navigator.params.socket.emit("disconnect");
        }
        VKConnect.send("VKWebAppEnableSwipeBack", {});
    }

    render() {
        const {id, navigator} = this.props;

        return (
            <Panel id={id} theme="white">
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Чат">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online onChange={() => navigator.goBack()}>
                    <Header level="secondary">
                        Чат
                    </Header>
                    <FixedLayout vertical="bottom">
                        <Chat socket={navigator.params.socket}/>
                    </FixedLayout>
                </Online>
                <Offline>
                    <OfflineBlock />
                </Offline>
            </Panel>
        );
    }
}

export default ServerChat;