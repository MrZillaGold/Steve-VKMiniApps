import React, { useEffect, useReducer } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { Button, Group } from "@vkontakte/vkui";
import { Icon16Done, Icon20StoryOutline, Icon24Message, Icon24Replay } from "@vkontakte/icons";

import { getRandomElement, storyBackgrounds } from "../../functions";

import "./Send.css";

export function Send({ title, body, backgroundColor, textColor, index, getSpriteCoordinates, blob }) {

    const [{ sent, lock }, setSend] = useReducer((state, updates) => ({
        ...state,
        ...updates
    }), {
        sent: false,
        lock: false
    });

    const send = () => {
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
                            background_color: backgroundColor,
                            text_color: textColor,
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

    const openStoryEditor = () => {
        VKBridge.send("VKWebAppShowStoryBox", {
            background_type: "image",
            url: getRandomElement(storyBackgrounds),
            stickers: [{
                sticker_type: "renderable",
                sticker: {
                    content_type: "image",
                    blob,
                    transform: {
                        relation_width: 0.8
                    },
                    clickable_zone: {
                        action_type: "link",
                        action_app: {
                            app_id: 7078246
                        }
                    },
                    can_delete: false
                }
            }],
            attachment: {
                text: "open",
                type: "url",
                url: "https://vk.com/minetools#achievements"
            }
        })
            .catch(console.log);
    }

    useEffect(() => setSend({
        lock: false,
        sent: false
    }), [title, body, index]);

    return (
        <Group mode="plain">
            <div className="Send-Buttons">
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
                        className="Send-Button"
                >
                    <Icon24Replay width={16} height={16}/>
                </Button>
            </div>
            <div className="Send-Buttons">
                <Button onClick={openStoryEditor}
                        before={
                            <Icon20StoryOutline width={16} height={16}/>
                        }
                        stretched
                        disabled={!(blob && VKBridge.supports("VKWebAppShowStoryBox"))}
                >
                    Поделиться в истории
                </Button>
            </div>
        </Group>
    )
}
