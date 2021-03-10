import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { NameMC } from "namemcwrapper";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, SmartCols } from "../../components";

import { Form } from "./Form";
import { Info } from "./Info";

import { timeConvert } from "../../functions";
export function User({ id }) {

    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [nickname, setNickname] = useState("");
    const [user, setUser] = useState(null);
    const [add, setAdd] = useReducer((currentState, updates) => (updates), null);

    const getUser = (nickname) => {
        setUser(null);
        setSpinner(true);

        axios.get(`https://api.ashcon.app/mojang/v2/user/${nickname}`)
            .then(async ({ data: { username_history, username, created_at, textures }}) => {
                const data = {
                    list: username_history,
                    username: username,
                    createdAt: created_at ? timeConvert(created_at) : null,
                    skin: {
                        url: `https://stevecors.herokuapp.com/${textures.skin.url.replace("http://", "https://")}`,
                        history: [],
                        isSlim: textures.slim || false,
                        cape: (textures.cape && textures.cape.data) || null,
                        selected: 1
                    }
                };

                const nameMc = new NameMC({
                    proxy: "https://stevecors.herokuapp.com"
                });

                await nameMc.skinHistory({ nickname: username })
                    .then((skins) => data.skin.history = skins)
                    .catch(console.log);

                if (mount) {
                    setUser(data);
                    add(username);
                    setSpinner(false);

                    while (!(data.skin.history.length % 30)) {
                        const prevLength = data.skin.history.length;

                        await nameMc.skinHistory({ nickname: username, page: data.skin.history.length / 30 + 1 })
                            .then((skins) => {
                                data.skin.history.push(...skins);

                                if (mount) {
                                    setUser({...data});
                                }
                            })
                            .catch(console.log);

                        if (prevLength === data.skin.history.length) {
                            break;
                        }
                    }
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
                                return setError("Произошла ошибка при получении данных. Попробуйте позже.");
                        }
                    }

                    setError("Произошла ошибка. Попробуйте позже.");
                }

                console.log(error);
            });
    };

    useEffect(() => () => setMount(false), []);

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация об игроке"/>
            <Online>
                <SmartCols col1={
                    <Form nickname={nickname}
                          setNickname={setNickname}
                          setAdd={setAdd}
                          getUser={getUser}
                          spinner={spinner}
                    />
                }
                           col2={
                               <Info user={user}
                                     setUser={setUser}
                                     error={error}
                                     spinner={spinner}
                               />
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
