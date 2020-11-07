import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, SplitCol, SplitLayout, useAdaptivity, Group, ViewWidth } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Info } from "./Info";

import { CustomPanelHeader, OfflineBlock } from "../../components/components";

export function Hypixel({ id }) {

    const { viewWidth } = useAdaptivity();

    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [mount, setMount] = useState(true);
    const [nickname, setNickname] = useState("");
    const [user, setUser] = useState(null);
    const [add, setAdd] = useReducer((currentState, updates) => (updates), null);

    useEffect(() => () => setMount(false), []);

    const getUser = (nickname) => {
        setUser(null);
        setSpinner(true);

        axios.get(`https://api.slothpixel.me/api/players/${nickname}`)
            .then(({ data }) => {
                if (!data) {
                    return setError("Произошла ошибка. Попробуйте позже.");
                }

                const { username } = data;

                if (mount) {
                    if (!username) {
                        setError(`Игрок ${nickname} никогда не заходил на Hypixel.`);
                    } else {
                        add(username);
                        setUser(data);
                    }

                    setSpinner(false);
                }
            })
            .catch((error) => {
                if (mount) {
                    setSpinner(false);

                    switch (error.toString()) {
                        case "Error: Player does not exist":
                            return setError(`Игрока с никнеймом ${nickname} не существует!`);
                        default:
                            return setError("Информация об игроках и их статистика в данный момент недоступна. Попробуйте позже.");
                    }
                }
            });
    };

    let HypixelForm = <Form key="HypixelForm" nickname={nickname} setNickname={setNickname} setAdd={setAdd} getUser={getUser} spinner={spinner}/>
    let HypixelInfo = <Info key="HypixelInfo" user={user} error={error} spinner={spinner}/>

    if (viewWidth > ViewWidth.MOBILE) {
        HypixelForm = (
            <SplitCol spaced
                      key="HypixelForm"
            >
                {
                    HypixelForm
                }
            </SplitCol>
        )
        HypixelInfo = (
            <SplitCol width={`${viewWidth >= ViewWidth.DESKTOP ? 200 : 40}px`}
                      key="HypixelInfo"
                      spaced
            >
                {
                    HypixelInfo
                }
            </SplitCol>
        )
    }

    const HypixelChild = [
        HypixelForm,
        HypixelInfo
    ];

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Статистика Hypixel"/>
            <Online>
                {
                    viewWidth > ViewWidth.MOBILE ?
                        <SplitLayout>
                            {HypixelChild}
                        </SplitLayout>
                        :
                        HypixelChild
                }
            </Online>
            <Offline>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
