import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, SplitCol, SplitLayout, useAdaptivity, Group, ViewWidth } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Info } from "./Info";

import { CustomPanelHeader, OfflineBlock } from "../../components/components";
import { declOfNum } from "../../functions";

import defaultImage from "../../assets/server-default.png";

export function Server({ id }) {

    const { viewWidth } = useAdaptivity();

    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [IP, setIP] = useState("");
    const [server, setServer] = useState(null);
    const [add, setAdd] = useReducer((currentState, updates) => (updates), null);
    const [{ edit, setOpen, items }, setFavorite] = useState({});

    useEffect(() => () => setMount(false), []);

    const getServer = (ip) => {
        setServer(null);
        setSpinner(true);

        axios.get(`https://api.mcsrvstat.us/2/${ip}`)
            .then(({ data }) => {
                if (mount) {
                    const { online, players, icon } = data;

                    if (online) {
                        if (players.list) {
                            const online = players.online || 0;
                            const list = players.list.filter((name) => name.match(/^[A-Za-z0-9_]{1,16}$/g));

                            data.players.list = (list.length < online && list.length === 12 ? `${list} и еще ${online - list.length} ${declOfNum(online - list.length, ["другой", "других", "других"])} ${declOfNum(online - list.length, ["игрок", "игрока", "игроков"])}` : list.toString()).replace(/,/g, ", ");
                        }

                        if (icon) {
                            data.icon = icon.replace(/\//g, "/");
                        } else {
                            data.icon = defaultImage;
                        }

                        data.ip = ip.toLowerCase();

                        setServer(data);
                    } else {
                        setError(`Сервер ${ip} оффлайн, либо информация отсутствует.`);
                    }

                    setSpinner(false);
                }
            })
            .catch((error) => {
                if (mount) {
                    setError("Произошла ошибка. Попробуйте позже.");
                    setSpinner(false);

                    console.log(error);
                }
            });
    };

    let ServerForm = <Form key="ServerForm" IP={IP} setIP={setIP} setAdd={setAdd} getServer={getServer} spinner={spinner} edit={edit} setOpen={setOpen} setFavorite={setFavorite}/>
    let ServerInfo = <Info key="ServerInfo" server={server} error={error} spinner={spinner} add={add} favorite={items}/>

    if (viewWidth > ViewWidth.MOBILE) {
        ServerForm = (
            <SplitCol spaced
                      key="ServerForm"
            >
                {
                    ServerForm
                }
            </SplitCol>
        )
        ServerInfo = (
            <SplitCol width={`${viewWidth >= ViewWidth.DESKTOP ? 200 : 40}px`}
                      key="ServerInfo"
                      spaced
            >
                {
                    ServerInfo
                }
            </SplitCol>
        )
    }

    const ServerChild = [
        ServerForm,
        ServerInfo
    ];

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация о сервере"/>
            <Online>
                {
                    viewWidth > ViewWidth.MOBILE ?
                        <SplitLayout>
                            {ServerChild}
                        </SplitLayout>
                        :
                        ServerChild
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
