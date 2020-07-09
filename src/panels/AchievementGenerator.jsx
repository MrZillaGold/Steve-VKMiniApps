import React, { useReducer, useState } from "react";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { Offline, Online } from "react-detect-offline";

import { Panel,Input, FormLayout, Button, Group, Div, Separator, FormLayoutGroup, CardGrid, Card } from "@vkontakte/vkui";
import { OfflineBlock, Spinner, Error, PanelHeader } from "../components/components";

import { randomInteger } from "../functions";

import { IconChest } from "../icons/icons";
import Icon24Message from "@vkontakte/icons/dist/24/message";
import Icon16Done from "@vkontakte/icons/dist/16/done";
import Icon24CameraOutline from "@vkontakte/icons/dist/24/camera_outline";

import "./AchievementGenerator.css";

const storyBackgrounds = [
    "https://sun1-89.userapi.com/KuxE4p0_eMMsy-zoDTwjOGdP-bABJyg9W2jkTQ/ZTRT9qKrJxE.jpg",
    "https://sun1-15.userapi.com/_swcoPn4QQsqSOdiHOKgveXC6FKvGip0zwtQTw/2KE8Qqhm9aM.jpg",
    "https://sun1-97.userapi.com/ugFzgWC1mztS1RVU7EjKg8RYXWr6gjOUIDAHog/jK07Gyw57q0.jpg",
    "https://sun1-87.userapi.com/pKoppSSgergzXYlryFblG4iO8em0LL6apARaow/oPWJde2SxTQ.jpg",
    "https://sun1-85.userapi.com/KpM6KUrM-sIIEUGPZ8tppNl-61RExXl15G5xMw/sg_lnwXqGVs.jpg"
];

export function AchievementGenerator({ id, navigator }) {

    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [achievement, setAchievement] = useReducer((state, achievement) => {
        if (achievement.url) {
            setSpinner(false);
        }

        return {
            ...state,
            ...achievement
        };
    }, {
        title: "",
        text: "",
        sent: false,
        lock: false,
        url: null
    });

    const sendToDM = () => {
        setAchievement({ lock: true });

        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(({ result }) => {
                if (result) {
                    setAchievement({ sent: true });

                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "photo",
                            url: achievement.url
                        }
                    });
                }
            })
            .catch(console.log);
    };

    const inputAchievement = (event) => {
        const { value, name } = event.currentTarget;

        setAchievement({
            [name]: value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]/g, "").slice(0, 20)
        });
    };

    const generateAchievement = () => {
        setAchievement({ url: null, lock: false, sent: false });
        setSpinner(true);

        axios.get("https://vkfreeviews.000webhostapp.com/a.php?h=&t=")
            .then(() => {
                setAchievement({ url: `https://vkfreeviews.000webhostapp.com/a.php?h=${achievement.title}&t=${achievement.text}&i=${randomInteger(1, 530)}` })
            })
            .catch(error => {
                setSpinner(false);

                setError("Произошла ошибка. Попробуйте позже.");
                console.log(error);
            });
    };

    const openStoryEditor = () => {
        VKBridge.send("VKWebAppShowStoryBox", {
            background_type: "image",
            url: storyBackgrounds[randomInteger(0, storyBackgrounds.length - 1)],
            stickers: [{
                sticker_type: "renderable",
                sticker: {
                    content_type: "image",
                    url: achievement.url,
                    transform: {
                        relation_width: 0.8
                    }
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

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Генератор достижений"
                         navigator={navigator}
                         left
            />
            <Online>
                <FormLayout>
                    <Input top="Заголовок"
                           name="title"
                           disabled={spinner}
                           value={achievement.title}
                           onChange={inputAchievement}
                           placeholder="Достижение получено!"
                           maxLength="20"
                    />
                    <FormLayoutGroup top="Текст достижения"
                                     bottom="Поля могут содержать символы латиницы, кириллицы, цифры и спец. символы. (Не больше 20)"
                    >
                        <div>
                            <div>
                                <Input name="text"
                                       disabled={spinner}
                                       value={achievement.text}
                                       onChange={inputAchievement}
                                       placeholder="Терпение и труд"
                                       maxLength="20"
                                />
                            </div>
                        </div>
                    </FormLayoutGroup>
                    <Button disabled={!((achievement.title.length > 0 || achievement.text.length > 0) && !spinner)}
                            onClick={generateAchievement}
                            size="xl"
                    >
                        <b>Сгенерировать достижение</b>
                    </Button>
                </FormLayout>
                {
                    spinner && <Spinner/>
                }
                {
                    error && <Error error={error}/>
                }
                {
                    achievement.url &&
                    <>
                        <Separator style={{ margin: "15px 0 19px 0" }}/>
                        <Group>
                            <CardGrid style={{ margin: "0 0 27px 0" }}>
                                <Card size="l" mode="shadow" >
                                    <Div>
                                        <img src={achievement.url}
                                             className="achievement-image"
                                             style={{ position: "absolute", right: "0", left: "0" }}
                                             alt=""
                                        />
                                        <IconChest className="achievement-image"/>
                                        <Separator style={{ margin: "12px 0" }} />
                                        <div style={{ display: "flex" }}>
                                            <Button style={{ flexGrow: 10 }}
                                                    stretched
                                                    before={achievement.sent ? <Icon16Done/> : <Icon24Message width={16} height={16} />}
                                                    disabled={achievement.lock}
                                                    onClick={sendToDM}
                                            >
                                                <b>{achievement.sent ? "Сообщение отправлено!" : "Получить картинку в сообщения"}</b>
                                            </Button>
                                            <Button disabled={!VKBridge.supports("VKWebAppShowStoryBox")}
                                                    onClick={openStoryEditor}
                                                    style={{ marginLeft: "10px", width: "8px", flexGrow: "1" }}
                                                    stretched
                                            >
                                                <Icon24CameraOutline width={16} height={16}/>
                                            </Button>
                                        </div>
                                    </Div>
                                </Card>
                            </CardGrid>
                        </Group>
                    </>
                }
            </Online>
            <Offline>
                <OfflineBlock/>
            </Offline>
        </Panel>
    )
}
