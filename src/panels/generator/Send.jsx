import React, { useEffect, useReducer } from "react";
import VKBridge from "@vkontakte/vk-bridge";

import { Button, Group, Div } from "@vkontakte/vkui";
import { Icon16Done, Icon24Message, Icon24Replay } from "@vkontakte/icons";

export function Send({ title, body, index, getSpriteCoordinates }) {

    const [{ sent, lock }, setSend] = useReducer((state, updates) => ({
        ...state,
        ...updates
    }), {
        sent: false,
        lock: false
    });

    const send = () => {
        console.log(title, body, index)

        setSend({ lock: true });

        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(({ result }) => {
                if (result) {
                    setSend({ sent: true });

                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "achievement",
                            title,
                            body: body === "" ? " " : body,
                            index
                        }
                    });
                }
            })
            .catch((error) => {
                const { error_data } = error;

                if (error_data.error_reason === "User denied") {
                    return setSend({ lock: false });
                }

                console.log(error);
            });
    };

    useEffect(() => setSend({
        lock: false,
        sent: false
    }), [title, body, index]);

    return (
        <Group mode="plain">
            <Div style={{ display: "flex" }}>
                <Button before={
                    sent ?
                        <Icon16Done/>
                        :
                        <Icon24Message width={16} height={16}/>
                }
                        stretched
                        disabled={lock || !index}
                        onClick={send}
                        style={{ flexGrow: 10 }}
                >
                    {
                        sent ?
                            "Сообщение отправлено!"
                            :
                            "Получить картинку в сообщения"
                    }
                </Button>
                <Button onClick={getSpriteCoordinates}
                        style={{ marginLeft: "10px", width: "8px" }}
                >
                    <Icon24Replay width={16} height={16}/>
                </Button>
            </Div>
        </Group>
    )
}
