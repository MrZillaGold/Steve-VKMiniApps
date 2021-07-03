import React, { useEffect, useReducer, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MiniInfoCell, UsersStack, Spacing } from "@vkontakte/vkui";
import { Icon20CommunityName, Icon20GameOutline, Icon20LaptopOutline, Icon20PacmanOutline, Icon20PinOutline, Icon20StatisticsOutline, Icon20Users, Icon20ViewOutline, Icon24Done } from "@vkontakte/icons";

import { IconServer } from "../../../../icons";

import { ASHCON_ENDPOINT, declOfNum, humanizeDuration, timeConvert } from "../../../../utils";

import "../../../hypixel/Info.css";

export function Main({ user: { uuid, views, friends, servers, badlion }, setActiveTab }) {

    const [mount, setMount] = useState(true);
    const [copied, setCopied] = useReducer((state, updates) => ({
        ...state,
        ...updates
    }), {
        uuid: false,
        clearedUuid: false
    });

    useEffect(() => {
        setInterval(() => {
            if (mount) {
                setCopied({
                    uuid: false,
                    clearedUuid: false
                });
            }
        }, 10_000);

        return () => setMount(false);
    }, []);

    const clearedUUID = uuid.replaceAll("-", "");

    return (
        <>
            <CopyToClipboard text={uuid}
                             onClick={() => setCopied({ uuid: true })}
            >
                <MiniInfoCell
                    textLevel="primary"
                    before={
                        copied.uuid ?
                            <Icon24Done width={20} height={20}/>
                            :
                            <Icon20CommunityName/>
                    }
                    mode="add"
                    onClick={() => setCopied({ uuid: true })}
                >
                    UUID: {uuid}
                </MiniInfoCell>
            </CopyToClipboard>
            <CopyToClipboard text={clearedUUID}
                             onClick={() => setCopied({ uuid: true })}
            >
                <MiniInfoCell
                    textLevel="primary"
                    before={
                        copied.clearedUuid ?
                            <Icon24Done width={20} height={20}/>
                            :
                            <Icon20CommunityName/>
                    }
                    mode="add"
                    onClick={() => setCopied({ clearedUuid: true })}
                >
                    Очищенный UUID: {clearedUUID}
                </MiniInfoCell>
            </CopyToClipboard>
            <Spacing separator/>
            <MiniInfoCell
                before={
                    <Icon20Users width={20} height={20}/>
                }
                mode="more"
                onClick={() => setActiveTab("friends")}
                after={
                    <UsersStack
                        photos={
                            friends.slice(0, 3).map(({ uuid }) => (
                                `${ASHCON_ENDPOINT}/avatar/${uuid}`
                            ))
                        }
                    />
                }
            >
                {friends.length} {declOfNum(friends.length, ["друг", "друга", "друзей"])}
            </MiniInfoCell>
            <MiniInfoCell
                before={
                    <IconServer width={20} height={20}/>
                }
                mode="more"
                onClick={() => setActiveTab("servers")}
                after={
                    <UsersStack
                        photos={
                            servers.slice(0, 3).map(({ icon }) => icon)
                        }
                    />
                }
            >
                {servers.length} {declOfNum(servers.length, ["любимый сервер", "любимых сервера", "любимых серверов"])}
            </MiniInfoCell>
            <Spacing separator/>
            <MiniInfoCell
                textLevel="primary"
                before={
                    <Icon20ViewOutline/>
                }
            >
                {views} {declOfNum(views, ["просмотр", "просмотра", "просмотров"])}
            </MiniInfoCell>
            {
                badlion && <>
                    <MiniInfoCell
                        textLevel="primary"
                        before={
                            <Icon20LaptopOutline/>
                        }
                    >
                        Последний онлайн { timeConvert(badlion.last_online) } в { new Date(badlion.last_online).toLocaleTimeString() }
                    </MiniInfoCell>
                    <MiniInfoCell
                        textLevel="primary"
                        before={
                            <Icon20GameOutline/>
                        }
                    >
                        Наиграно { humanizeDuration(badlion.play_time) }
                    </MiniInfoCell>
                    <MiniInfoCell
                        textLevel="primary"
                        before={
                            <Icon20PinOutline/>
                        }
                    >
                        Версия { badlion.version }
                    </MiniInfoCell>
                    <MiniInfoCell
                        textLevel="primary"
                        before={
                            <Icon20PacmanOutline/>
                        }
                    >
                        Последний сервер { badlion.last_server || "скрыт" }
                    </MiniInfoCell>
                    {
                        Boolean(badlion.login_streak.current || badlion.login_streak.max) && (
                            <MiniInfoCell
                                textLevel="primary"
                                before={
                                    <Icon20StatisticsOutline/>
                                }
                            >
                                Входов подряд: { badlion.login_streak.current } ({ badlion.login_streak.max })
                            </MiniInfoCell>
                        )
                    }
                </>
            }
        </>
    );
}
