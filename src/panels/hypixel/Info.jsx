import React, { useState, Suspense } from "react";
import { Group, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { Error, Spinner, TabsSelect, UserCard } from "../../components";

import "./Info.css";

const Main = React.lazy(() => import("./modes/Main"));
const BedWars = React.lazy(() => import("./modes/BedWars"));
const SkyWars = React.lazy(() => import("./modes/SkyWars"));
const BuildBattle = React.lazy(() => import("./modes/BuildBattle"));
const UHC = React.lazy(() => import("./modes/UHC"));
const TNT = React.lazy(() => import("./modes/TNT"));
const Duels = React.lazy(() => import("./modes/Duels"));
const MurderMystery = React.lazy(() => import("./modes/MurderMystery"));

export default function Info({ user, spinner, error }) {

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
                {
                    user ?
                        <Group mode="plain">
                            <UserCard user={user}/>
                            <TabsSelect activeTab={activeTab}
                                       setActiveTab={setActiveTab}
                                       tabs={modes}
                            />
                            <Suspense fallback={<></>}>
                                {
                                    modes.get(activeTab)[1]
                                }
                            </Suspense>
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
        </Group>
    )
}
