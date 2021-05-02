import React, { useEffect, useReducer, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Input, FormLayout, FormItem, FormLayoutGroup, SimpleCell } from "@vkontakte/vkui";
import { Icon24Copy, Icon24Done } from "@vkontakte/icons";

import { declOfNum, humanizeDuration, timeConvert } from "../../../../utils";

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
        <FormLayout>
            <FormLayoutGroup mode="horizontal">
                <FormItem top="UUID">
                    <Input value={uuid}
                           after={
                               <CopyToClipboard text={uuid}>
                                   <div onClick={() => setCopied({ uuid: true })}>
                                       {
                                           copied.uuid ?
                                               <Icon24Done/>
                                               :
                                               <Icon24Copy/>
                                       }
                                   </div>
                               </CopyToClipboard>
                           }
                           readOnly
                    />
                </FormItem>
                <FormItem top="Очищенный UUID">
                    <Input value={clearedUUID}
                           after={
                               <CopyToClipboard text={clearedUUID}>
                                   <div onClick={() => setCopied({ clearedUuid: true })}>
                                       {
                                           copied.clearedUuid ?
                                               <Icon24Done/>
                                               :
                                               <Icon24Copy/>
                                       }
                                   </div>
                               </CopyToClipboard>
                           }
                           readOnly
                    />
                </FormItem>
            </FormLayoutGroup>
            <div className="Info-List">
                <SimpleCell description={declOfNum(views, ["Просмотр", "Просмотра", "Просмотров"])}
                            disabled
                >
                    { views }
                </SimpleCell>
                <SimpleCell description={
                    declOfNum(friends.length, ["Друг", "Друга", "Друзей"])
                }
                            onClick={() => setActiveTab("friends")}
                >
                    { friends.length }
                </SimpleCell>
                <SimpleCell description={
                    declOfNum(servers.length, ["Любимый сервер", "Любимых сервера", "Любимых серверов"])
                }
                            onClick={() => setActiveTab("servers")}
                >
                    { servers.length }
                </SimpleCell>
            </div>
            {
                badlion &&
                <>
                    <div className="Info-List">
                        <SimpleCell description="Последний онлайн"
                                    disabled
                        >
                            { timeConvert(badlion.last_online) }
                            <br/>
                            { new Date(badlion.last_online).toLocaleTimeString() }
                        </SimpleCell>
                        <SimpleCell description="Наиграно"
                                    disabled
                        >
                            { humanizeDuration(badlion.play_time) }
                        </SimpleCell>
                        <SimpleCell description="Версия"
                                    disabled
                        >
                            { badlion.version }
                        </SimpleCell>
                    </div>
                    <div className="Info-List">
                        <SimpleCell description="Последний сервер"
                                    disabled
                        >
                            {
                                badlion.last_server === "Hidden" ?
                                    "Скрыт"
                                    :
                                    badlion.last_server
                            }
                        </SimpleCell>
                        {
                            Boolean(badlion.login_streak.current || badlion.login_streak.max) &&
                            <SimpleCell description="Входов подряд"
                                        disabled
                            >
                                Сейчас: { badlion.login_streak.current }
                                <br/>
                                Максимум: { badlion.login_streak.max }
                            </SimpleCell>
                        }
                    </div>
                </>
            }
        </FormLayout>
    );
}
