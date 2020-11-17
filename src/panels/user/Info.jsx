import React, { useState } from "react";
import { Group, Tabs, TabsItem, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { Error, Spinner } from "../../components/components";
import { HeightAnimation } from "../../animation/animation";

import { NameHistory } from "./NameHistory";
import { Skin } from "./Skin";


export function Info({ user, setUser, spinner, error }) {

    const { viewWidth } = useAdaptivity();

    const [activeTab, setActiveTab] = useState("skin");

    return (
        <Group>
            <HeightAnimation>
                {
                    user ?
                        <Group mode="plain">
                            <Tabs style={viewWidth <= ViewWidth.SMALL_TABLET ? { marginTop: 0, marginBottom: 8 } : {}}>
                                <TabsItem
                                    onClick={() => setActiveTab("skin")}
                                    selected={activeTab === "skin"}
                                >
                                    Скин
                                </TabsItem>
                                <TabsItem
                                    onClick={() => setActiveTab("names")}
                                    selected={activeTab === "names"}
                                >
                                    История никнейма
                                </TabsItem>
                            </Tabs>
                            {
                                activeTab === "skin" && <Skin user={user} setUser={setUser}/>

                            }
                            {
                                activeTab === "names" && <NameHistory user={user}/>
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
