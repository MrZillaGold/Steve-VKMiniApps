import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Info } from "./Info";

import { CustomPanelHeader, OfflineBlock, ScrollToUp, SmartCols } from "../../components/components";
import { declOfNum } from "../../functions";

import defaultImage from "../../assets/server-default.png";

export function Server({ id }) {

    const [scrollUp, setScrollUp] = useState(false);
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

        Promise.allSettled([
            axios.get(`https://api.mcsrvstat.us/2/${ip}`)
                .then(({ data }) => data),
            axios.get(`https://minecraft-statistic.net/api/server/info/${ip.replace(":", "_")}`)
                .then(({ data }) => data)
        ])
            .then(([server, statistic]) => {
                if (server.status === "rejected") {
                    throw server.reason;
                }

                if (statistic.status === "fulfilled") {
                    console.log(statistic.value._id)
                    server.value.id = statistic.value._id;
                }

                server = server.value;

                if (mount) {
                    const { online, players, icon } = server;

                    if (online) {
                        if (players.list) {
                            const online = players.online || 0;
                            const list = players.list.filter((name) => name.match(/^[A-Za-z0-9_]{1,16}$/g));

                            server.players.list = (list.length < online && list.length === 12 ? `${list} и еще ${online - list.length} ${declOfNum(online - list.length, ["другой", "других", "других"])} ${declOfNum(online - list.length, ["игрок", "игрока", "игроков"])}` : list.toString()).replace(/,/g, ", ");
                        }

                        if (icon) {
                            server.icon = icon.replace(/\//g, "/");
                        } else {
                            server.icon = defaultImage;
                        }

                        server.ip = ip.toLowerCase();

                        setServer(server);
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

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация о сервере"/>
            <Online>
                <SmartCols col1={
                    <Form IP={IP}
                          setIP={setIP}
                          setAdd={setAdd}
                          getServer={getServer}
                          spinner={spinner}
                          edit={edit}
                          setOpen={setOpen}
                          setFavorite={setFavorite}
                    />
                }
                           col2={
                               <Info server={server}
                                     error={error}
                                     spinner={spinner}
                                     add={add}
                                     favorite={items}
                                     setScrollUp={setScrollUp}
                               />
                           }
                />
                <ScrollToUp scrollUp={scrollUp}/>
            </Online>
            <Offline>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
