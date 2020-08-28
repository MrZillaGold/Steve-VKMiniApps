import * as SkinView from "skinview3d";
import VKBridge from "@vkontakte/vk-bridge";

import React, { useReducer } from "react";
import { Button, Card, CardGrid, ModalPage, Separator, Div } from "@vkontakte/vkui";
import { Icon24DoneOutline, Icon24Message, Icon24Download } from "@vkontakte/icons";
import SkinViewer from "react-skinview3d";

import "./SkinGalleryView.css";

export function SkinGalleryView({ id, onClose, header, navigator, scheme }) {

    const [message, setMessage] = useReducer((state, message) => ({
        ...state,
        ...message
    }), {
        sent: false,
        lock: false
    });

    const sendToDM = () => {
        setMessage({ lock: true });

        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(({ result }) => {
                if (result) {
                    setMessage({ sent: true });

                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "document",
                            url: navigator.params.url.replace("https://stevecors.herokuapp.com/", ""),
                            model: navigator.params.isSlim ? "slim" : "classic"
                        }
                    });
                }
            })
            .catch((error) => {
                const { error_reason } = error;

                if (error_reason && error_reason === "User denied") {
                    return setMessage({ lock: false });
                }

                console.log(error)
            });
    };

    return (
        <ModalPage id={id}
                   header={header}
                   onClose={onClose}
        >
            <CardGrid>
                <Card size="l">
                    <div className={`SkinGalleryView-SkinViewer-${scheme}`}>
                        <SkinViewer skinUrl={navigator.params.url}
                                    className="SkinGalleryView-SkinViewer"
                                    height={300}
                                    width={200}
                                    onReady={(skinViewer) => {
                                        skinViewer.animation = new SkinView.CompositeAnimation();

                                        skinViewer.animation.add(SkinView.WalkingAnimation);

                                        skinViewer.detectModel = false;
                                        skinViewer.playerObject.skin.slim = navigator.params.isSlim;
                                    }}
                        />
                    </div>
                    <Separator/>
                    <Div style={{ display: "flex" }}>
                        <Button stretched
                                before={
                                    message.sent ?
                                        <Icon24DoneOutline width={16} height={16}/>
                                        :
                                        <Icon24Message width={16} height={16}/>
                                }
                                disabled={message.lock}
                                onClick={sendToDM}
                                style={{ padding: "0 8px" }}
                        >
                            <b>{message.sent ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b>
                        </Button>
                        <Button style={{ marginLeft: "5px", padding: "0 8px" }}
                                onClick={() =>
                                    VKBridge.send("VKWebAppShowImages", {
                                        images: [
                                            navigator.params.url.replace("https://stevecors.herokuapp.com/", "")
                                        ]
                                    })
                                }
                                disabled={!VKBridge.supports("VKWebAppShowImages")}
                        >
                            <Icon24Download width={16} height={16}/>
                        </Button>
                    </Div>
                </Card>
            </CardGrid>
        </ModalPage>
    );
}
