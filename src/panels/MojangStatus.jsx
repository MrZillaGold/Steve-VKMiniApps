import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";

import { Panel, Avatar, Group, Cell, List, Header, CardGrid, Card } from "@vkontakte/vkui";
import { OfflineBlock, Error, Spinner, PanelHeader } from "../components/components";

import green from "../assets/green.gif";
import yellow from "../assets/yellow.gif";
import red from "../assets/red.gif";

const servers = [
    {
        name: "minecraft.net",
        title: "Minecraft.net"
    },
    {
        name: "session.minecraft.net",
        title: "Сессии Minecraft"
    },
    {
        name: "account.mojang.com",
        title: "Аккаунты Mojang"
    },
    {
        name: "authserver.mojang.com",
        title: "Авторизация Mojang"
    },
    {
        name: "sessionserver.mojang.com",
        title: "Сессии Mojang"
    },
    {
        name: "api.mojang.com",
        title: "API Mojang"
    },
    {
        name: "textures.minecraft.net",
        title: "Текстуры/Скины Minecraft"
    },
    {
        name: "mojang.com",
        title: "Mojang.com"
    },
];

export function MojangStatus({ id, navigator }) {

    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useState(true);

    const [services, setServices] = useReducer((state, services) => {
        setSpinner(false);

        return services;
    }, null);

    useEffect(() => {
        axios.get("https://stevecors.herokuapp.com/https://status.mojang.com/check")
            .then(({ data }) => setServices(data))
            .catch(error => {
                setError("Произошла ошибка. Попробуйте позже.");

                console.log(error);
            });
    }, []);

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Состояние серверов"
                         navigator={navigator}
                         left
            />
            <Online>
                {
                    spinner && <Spinner/>
                }
                {
                    services &&
                    <CardGrid style={{ margin: "5px 0 20px 0" }}>
                        <Card size="l" mode="shadow">
                            <Group header={
                                <Header>
                                    Список серверов
                                </Header>
                            }>
                                <List>
                                    {
                                        servers.map(({ name, title }, index) => {
                                            const service = services[index][name];

                                            const status = service === "green" ?
                                                {
                                                    image: green, text: "Всё в порядке"
                                                }
                                                :
                                                service === "yellow" ?
                                                    {
                                                        image: yellow, text: "Небольшие неполадки"
                                                    }
                                                    :
                                                    {
                                                        image: red, text: "Проблемы с доступностью"
                                                    };

                                            return <Cell key={index}
                                                         before={
                                                             <Avatar src={status.image}/>
                                                         }
                                                         description={status.text}
                                            >
                                                {title}
                                            </Cell>
                                        })
                                    }
                                </List>
                            </Group>
                        </Card>
                    </CardGrid>
                }
                {
                    error && <Error error={error} stretch/>
                }
            </Online>
            <Offline>
                <OfflineBlock/>
            </Offline>
        </Panel>
    )
}
