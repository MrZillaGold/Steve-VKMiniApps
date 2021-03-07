import React, { useEffect, useReducer, useState, Suspense } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, SmartCols } from "../../components";

const Form = React.lazy(() => import("./Form"));
const Info = React.lazy(() => import("./Info"));

export function Hypixel({ id }) {

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

                    if (error?.response?.status) {
                        switch (error.response.status) {
                            case 404:
                                return setError(`Игрока с никнеймом ${nickname} не существует!`);
                            case 400:
                                return setError("Никнейм может содержать только латинские буквы, цифры и символ \"_\".");
                            default:
                                return setError("Информация об игроках и их статистика в данный момент недоступна. Попробуйте позже.");
                        }
                    }

                    return setError("Информация об игроках и их статистика в данный момент недоступна. Попробуйте позже.");
                }
            });
    };

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Статистика Hypixel"/>
            <Online>
                <SmartCols col1={
                    <Suspense fallback={<></>}>
                        <Form nickname={nickname}
                              setNickname={setNickname}
                              setAdd={setAdd}
                              getUser={getUser}
                              spinner={spinner}
                        />
                    </Suspense>
                }
                           col2={
                               <Suspense fallback={<></>}>
                                   <Info user={user}
                                         error={error}
                                         spinner={spinner}
                                   />
                               </Suspense>
                           }
                />
            </Online>
            <Offline>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
