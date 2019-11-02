import React from 'react';
import {useState, useRef} from 'react';
import useSockets from '../hooks/useSockets';
import ScrollToBottom from "react-scroll-to-bottom";
import {Div, FormLayout, Input, platform, IOS, Separator, Tappable} from "@vkontakte/vkui";
import "../chat.scss";
import Icon24Send from '@vkontakte/icons/dist/24/send';
import useForm from "../hooks/useForm";
import useIsLogin from "../hooks/useIsLogin";

const Chat = (props) => {
    const IsLogin = useIsLogin(props.socket);
    const [displayMessages, setDisplayMessages] = useState([]);

    const historyMessages = useRef([]);
    const handleRecvMessage = (message) => {
        historyMessages.current = historyMessages.current.concat(message);
        const sliceMessages = historyMessages.current;
        setDisplayMessages(sliceMessages.slice(Math.max(sliceMessages.length - 200, 0)));
    };

    const [values, handleChange, handleSubmit] = useForm({
        message: {}
    }, ({ message }) => {
        if (message) {
            handleChange({name: 'message', value: ''});
            if (props.socket && props.socket.connected) {
                props.socket.emit('bot:chat', {message});
            }
        }
    });

    const tab = () => {
        props.socket.emit('bot:tabComplete', values.message, (_, matches) => {
            if (matches.length !== 0) {
                handleRecvMessage(matches.join(' '));
            }
        });
    };

    useSockets(props.socket, [
        { name: 'message:chat', handler: handleRecvMessage },
        { name: 'message:info', handler: handleRecvMessage },
        { name: 'message:error', handler: handleRecvMessage },
        { name: 'message:success', handler: handleRecvMessage }
    ]);

    return (
        <div>
            <Div>
        <ScrollToBottom className={platform() === IOS ? "chat-box_ios" : "chat-box_android"}>
            {displayMessages.map((message, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: message }}/>
            ))}
        </ScrollToBottom>
            </Div>
            <Separator/>
            <FormLayout onSubmit={handleSubmit}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Tappable disabled={!IsLogin} onClick={tab} style={{marginLeft: "10px"}}>
                        TAB
                    </Tappable>
                    <div style={{flexGrow: 999}}>
                        <Input disabled={!IsLogin} id="message-input" name="message" autoComplete="off" type="text" value={values.message} onChange={handleChange}/>
                    </div>
                    <div style={{marginRight: "10px"}}>
                        <Tappable style={!IsLogin ? {opacity: ".6"} : undefined} disabled={!IsLogin} onClick={handleSubmit}>
                            <Icon24Send width={30} height={30}/>
                        </Tappable>
                    </div>
                </div>
            </FormLayout>
        </div>
    );
};

export default Chat;