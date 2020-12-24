import React, { useContext, useEffect, useReducer } from "react";
import getArgs from "vkappsutils/dist/Args";
import VKBridge from "@vkontakte/vk-bridge";
import { Button, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon28Play, Icon28Pause, Icon28DownloadOutline, Icon28StoryOutline } from "@vkontakte/icons";

import { SkinViewer } from "./components";
import { IconRun, IconWalk } from "../icons/icons";

import { SchemeContext } from "../hooks/hooks";
import { getRandomElement, storyBackgrounds } from "../functions";

import "./SkinPreview.css";

export function SkinPreview({ skin, cape, isSlim, username = "", ...rest }) {

    const { viewWidth } = useAdaptivity();
    const { scheme } = useContext(SchemeContext);
    const { platform, id } = getArgs();

    const [{ skinViewer, paused, walk, lock }, setPreview] = useReducer((currentState, updates) => ({
        ...currentState,
        ...updates
    }), {
        skinViewer: null,
        lock: false,
        paused: false,
        walk: true
    });

    const togglePreviewAnimation = (action) => {
        switch(action) {
            case "animation":
                return setPreview({
                    walk: !walk
                });
            case "pause":
                return setPreview({
                    paused: !paused
                });
        }
    };

    useEffect(() => {
        setPreview({
            lock: false
        });
    }, [skin]);

    const sendMessage = () => {
        const skinUrl = skin.replace("https://stevecors.herokuapp.com/", "");

        if (VKBridge.supports("VKWebAppShowImages")) {
            VKBridge.send("VKWebAppShowImages", {
                images: [
                    skinUrl
                ]
            });
        } else {
            setPreview({ lock: true });

            VKBridge.send("VKWebAppAllowMessagesFromGroup", {
                group_id: 175914098
            })
                .then(({ result }) => {
                    if (result) {
                        VKBridge.send("VKWebAppSendPayload", {
                            group_id: 175914098,
                            payload: {
                                type: "document",
                                url: skinUrl,
                                name: username,
                                model: isSlim ? "slim" : "classic"
                            }
                        });
                    }
                })
                .catch((error) => {
                    const { error_data: { error_reason } } = error;

                    if (error_reason === "User denied") {
                        return setPreview({ lock: false });
                    }

                    console.log(error);
                });
        }
    };

    const openStoryEditor = async () => {
        skinViewer.render();

        VKBridge.send("VKWebAppShowStoryBox", {
            background_type: "image",
            url: getRandomElement(storyBackgrounds),
            stickers: [{
                sticker_type: "renderable",
                sticker: {
                    content_type: "image",
                    blob: skinViewer.canvas.toDataURL(),
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
                url: "https://vk.com/minetools"
            }
        })
            .catch(console.log);
    };

    const isWeb = platform === "desktop_web" || platform === "mobile_web";

    return (
        <div className={`SkinPreview SkinPreview-${scheme}`} {...rest}>
            <div className="SkinPreview-Buttons"
                 style={{ padding: viewWidth > ViewWidth.MOBILE ? 20 : 10 }}
            >
                <Button mode="secondary"
                        className="SkinPreview-Button"
                        onClick={() => togglePreviewAnimation("pause")}
                >
                    {
                        paused ? <Icon28Play/> : <Icon28Pause/>
                    }
                </Button>
                <Button mode="secondary"
                        className="SkinPreview-Button"
                        onClick={() => togglePreviewAnimation("animation")}
                >
                    {
                        walk ? <IconRun/> : <IconWalk/>
                    }
                </Button>
                <Button mode="secondary"
                        className="SkinPreview-Button"
                        onClick={openStoryEditor}
                        style={!id ? { display: "none" } : {}}
                >
                    <Icon28StoryOutline/>
                </Button>
                <Button mode="secondary"
                        className="SkinPreview-Button"
                        target="_blank"
                        rel="noreferrer"
                        href={skin && (isWeb || !id) ? skin.replace("https://stevecors.herokuapp.com/", "") : null}
                        disabled={lock}
                        onClick={isWeb || !id ? null : sendMessage}
                >
                    <Icon28DownloadOutline/>
                </Button>
            </div>
            <div className="SkinPreview-Render">
                <SkinViewer skin={skin}
                            cape={cape}
                            isSlim={isSlim}
                            height={
                                viewWidth > ViewWidth.MOBILE ?
                                    450
                                    :
                                    300
                            }
                            width={
                                viewWidth > ViewWidth.SMALL_TABLET ?
                                    350
                                    :
                                    300
                            }
                            zoom={viewWidth > ViewWidth.MOBILE}
                            onReady={
                                (skinViewer) => setPreview({
                                    skinViewer
                                })
                            }
                            animation={walk ? "walk" : "run"}
                            paused={paused}
                />
            </div>
        </div>
    )
}
