import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { NameMC } from "namemcwrapper";
import { Panel, SplitCol, SplitLayout, useAdaptivity, Group, ViewWidth } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Info } from "./Info";

import { CustomPanelHeader, OfflineBlock } from "../../components/components";
import { timeConvert } from "../../functions";

export function User({ id }) {

    const { viewWidth } = useAdaptivity();

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

        axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${nickname}`)
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

                await nameMc.skinHistory(username)
                    .then((skins) => data.skin.history = skins)
                    .catch(console.log);

                if (mount) {
                    setUser(data);
                    add(username);
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
                                return setError("Произошла ошибка при получении данных. Попробуйте позже.");
                        }
                    }

                    setError("Произошла ошибка. Попробуйте позже.");
                }

                console.log(error);
            });
    };

    useEffect(() => () => setMount(false), []);

    let UserForm = <Form key="UserForm" nickname={nickname} setNickname={setNickname} setAdd={setAdd} getUser={getUser} spinner={spinner}/>
    let UserInfo = <Info key="UserInfo" user={user} setUser={setUser} error={error} spinner={spinner}/>

    if (viewWidth > ViewWidth.MOBILE) {
        UserForm = (
            <SplitCol spaced
                      key="UserForm"
            >
                {
                    UserForm
                }
            </SplitCol>
        )
        UserInfo = (
            <SplitCol width={`${viewWidth >= ViewWidth.DESKTOP ? 200 : 40}px`}
                      key="UserInfo"
                      spaced
            >
                {
                    UserInfo
                }
            </SplitCol>
        )
    }

    const UserChild = [
        UserForm,
        UserInfo
    ];

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация об игроке"/>
            <Online>
            {
                viewWidth > ViewWidth.MOBILE ?
                    <SplitLayout>
                        {UserChild}
                    </SplitLayout>
                    :
                    UserChild
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
