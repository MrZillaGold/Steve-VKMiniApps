import React, { useEffect, useState } from "react";
import { Group, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { Error, Spinner, TabsSelect, UserCard}  from "../../components";
import { HeightAnimation } from "../../animation";

import { Main, Skin, NameHistory, Friends, Servers } from "./tabs";

export function Info({ user, setUser, spinner, error, setNickname, getUser }) {

    const { viewWidth } = useAdaptivity();

    const [activeTab, setActiveTab] = useState("main");

    useEffect(() => {
        setActiveTab("main");
    }, [spinner]);

    const tabs = new Map([
        ["main", ["Основная информация", <Main user={user} setUser={setUser} setActiveTab={setActiveTab}/>]],
        ["skin", ["Скин", <Skin user={user} setUser={setUser}/>]],
        ["names", ["История никнейма", <NameHistory user={user} setUser={setUser}/>]],
        ["friends", ["Друзья", <Friends user={user} setNickname={setNickname} getUser={getUser}/>]],
        ["servers", ["Любимые сервера", <Servers user={user}/>]]
    ]);

    return (
        <Group>
            <HeightAnimation>
                {
                    user ?
                        <Group mode="plain">
                            <UserCard user={user}/>
                            <TabsSelect style={viewWidth <= ViewWidth.SMALL_TABLET ? { marginTop: 0, marginBottom: 8 } : {}}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        tabs={tabs}
                            />
                            {
                                tabs.get(activeTab)[1]
                            }
                        </Group>
                        :
                        !spinner && !error && viewWidth > ViewWidth.MOBILE &&
                        <Error error="Информация об игроке появится здесь после ее получения."/>
                }
                {
                    spinner && <Spinner/>
                }
                {
                    error && <Error error={error}/>
                }
            </HeightAnimation>
        </Group>
    );
}
