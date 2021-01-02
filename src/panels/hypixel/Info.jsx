import React, { useState } from "react";
import { Group, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { Error, Spinner } from "../../components";
import { HeightAnimation } from "../../animation/animation";

import { UserCard } from "./UserCard";
import { TabsSelect } from "../../components/TabsSelect";

import { Main, BedWars, SkyWars, BuildBattle, UHC, TNT, Duels, MurderMystery } from "./modes";

import "./Info.css";

export function Info({ user, spinner, error }) {

    const { viewWidth } = useAdaptivity();

    const [activeTab, setActiveTab] = useState("main");

    const modes = new Map([
        ["main", ["Основная информация", <Main user={user}/>]],
        ["bedwars", ["BedWars", <BedWars user={user}/>]],
        ["skywars", ["SkyWars", <SkyWars user={user}/>]],
        ["murdermystery", ["Murder Mystery", <MurderMystery user={user}/>]],
        ["tnt", ["TNT Games", <TNT user={user}/>]],
        ["duels", ["Duels", <Duels user={user}/>]],
        ["buildbattle", ["BuildBattle", <BuildBattle user={user}/>]],
        ["uhc", ["UHC", <UHC user={user}/>]]
    ]);

    return (
        <Group>
            <HeightAnimation>
                {
                    user ?
                        <Group mode="plain">
                            <UserCard user={user}/>
                            <TabsSelect activeTab={activeTab}
                                       setActiveTab={setActiveTab}
                                       tabs={modes}
                            />
                            {
                                modes.get(activeTab)[1]
                            }
                        </Group>
                        :
                        !spinner && !error && viewWidth > ViewWidth.MOBILE && <Error error="Информация об игроке появится здесь после ее получения."/>
                }
                {
                    spinner && <Spinner/>
                }
                {
                    error && <Error error={error}/>
                }
            </HeightAnimation>
        </Group>
    )
}
