import React, { useState } from "react";
import { Group, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { Error, Spinner } from "../../components/components";

import { HeightAnimation } from "../../animation/animation";

import { UserCard } from "./UserCard";
import { TabSelect } from "./TabSelect";

import { Main } from "./modes/Main";
import { BedWars } from "./modes/BedWars";
import { BuildBattle } from "./modes/BuildBattle";
import { Duels } from "./modes/Duels";
import { UHC } from "./modes/UHC";
import { SkyWars } from "./modes/SkyWars";
import { MurderMystery } from "./modes/MurderMystery";
import { TNT } from "./modes/TNT";

import "./Info.css";

export function Info({ user, spinner, error }) {

    const { viewWidth } = useAdaptivity();

    const [activeTab, setActiveTab] = useState("main");

    const modes = new Map([
        ["main", ["Основная информация", <Main user={user}/>]],
        ["bedwars", ["BedWars", <BedWars user={user}/>]],
        ["buildbattle", ["BuildBattle", <BuildBattle user={user}/>]],
        ["duels", ["Duels", <Duels user={user}/>]],
        ["uhc", ["UHC", <UHC user={user}/>]],
        ["skywars", ["SkyWars", <SkyWars user={user}/>]],
        ["murdermystery", ["Murder Mystery", <MurderMystery user={user}/>]],
        ["tnt", ["TNT Games", <TNT user={user}/>]]
    ]);

    return (
        <Group>
            <HeightAnimation>
                {
                    user ?
                        <Group mode="plain">
                            <UserCard user={user}/>
                            <TabSelect activeTab={activeTab}
                                       setActiveTab={setActiveTab}
                                       modes={modes}
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
