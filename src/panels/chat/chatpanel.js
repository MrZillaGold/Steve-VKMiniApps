import React from 'react';
import { Offline, Online } from 'react-detect-offline';
import ScrollToBottom from "react-scroll-to-bottom";

import { Panel, PanelHeaderContent, PanelHeaderButton, FixedLayout, Header, Div, platform, IOS, Separator, FormLayout, Tappable, Input, PanelHeaderSimple, Avatar } from "@vkontakte/vkui";
import { OfflineBlock, HeaderButtons } from '../components/components';

import {IconSteve} from "../components/icons";
import Icon24Send from '@vkontakte/icons/dist/24/send';

import "./chat.css";

class ServerChat extends React.Component {

    state = {
        tab: "chat",
        historyMessages: [],
        displayMessages: [],
        messageInput: ""
    };

    componentDidMount() {
        this.useSockets(true);
    }

    componentWillUnmount() {
        const socket = this.props.navigator.params.socket;
        if (socket && socket.connected) {
            this.useSockets(false);
            socket.emit("disconnect");
        }
    }

    useSockets(value) {
        const socket = this.props.navigator.params.socket;
        const channels = [
            { name: 'message:chat', handler: this.newMessage.bind(this) },
            { name: 'message:info', handler: this.newMessage.bind(this) },
            { name: 'message:error', handler: this.newMessage.bind(this) },
            { name: 'message:success', handler: this.newMessage.bind(this) },
            { name: 'bot:connect', handler: () => this.setState({connected: true}) },
            { name: 'bot:disconnect', handler: () => this.setState({connected: false}) }
        ];

        if (socket && socket.connected) {
            channels.forEach(channel => {
                if (value) {
                    socket.on(channel.name, channel.handler);
                } else {
                    socket.off(channel.name, channel.handler);
                }
            });
        }
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    newMessage(message) {
        const historyMessages = this.state.historyMessages;
        const messages = historyMessages.concat(message);
        this.setState({displayMessages: messages.slice(Math.max(historyMessages.length - 200, 0)), historyMessages: messages});
    }

    tab() {
        this.props.navigator.params.socket.emit('bot:tabComplete', this.state.messageInput, (_, matches) => {
            if (matches.length !== 0) {
                this.newMessage(matches.join(' '));
            }
        });
    }

    send(socket) {
        if (socket && socket.connected) {
            socket.emit('bot:chat', {
                message: this.state.messageInput
            });
            return this.setState({messageInput: ""});
        }
    }

    render() {
        const {connected, displayMessages, messageInput} = this.state;
        const {id, navigator} = this.props;
        const socket = navigator.params.socket;

        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple separator={false}
                                   left={
                                       <PanelHeaderButton onClick={() => navigator.goBack()}>
                                           <HeaderButtons/>
                                       </PanelHeaderButton>
                                   }
                >
                    <PanelHeaderContent status="Minecraft чат"
                                        before={
                                            <Avatar className="steve-head"
                                                    size={36}
                                            >
                                                <IconSteve/>
                                            </Avatar>
                                        }
                    >
                        Steve
                    </PanelHeaderContent>
                </PanelHeaderSimple>
                <Online onChange={() => this.setState({connected: false})}>
                    <Header mode="secondary">
                        Чат
                    </Header>
                    <FixedLayout vertical="bottom">
                        <div>
                            <Div>
                                <ScrollToBottom className={platform() === IOS ? "chat-box_ios" : "chat-box_android"}>
                                    {displayMessages.map((message, index) => (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: message }}/>
                                    ))}
                                </ScrollToBottom>
                            </Div>
                            <Separator/>
                            {
                                connected ?
                                    <FormLayout>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Tappable onClick={() => this.tab()} style={{marginLeft: "10px"}}>
                                                TAB
                                            </Tappable>
                                            <div style={{flexGrow: 999}}>
                                                <Input id="message-input"
                                                    name="messageInput"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={messageInput}
                                                    placeholder="Сообщение"
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </div>
                                            <div style={{marginRight: "10px"}}>
                                                <Tappable onClick={() => this.send(socket)}>
                                                    <Icon24Send width={30} height={30}/>
                                                </Tappable>
                                            </div>
                                        </div>
                                    </FormLayout>
                                    :
                                    <div style={{height: "50px", lineHeight: "50px", textAlign: "center"}}>Вы не подключены к серверу!</div>
                            }
                        </div>
                    </FixedLayout>
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }
}

export default ServerChat;
