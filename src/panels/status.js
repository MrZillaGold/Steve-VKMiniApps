import React from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";

import { Panel, Avatar, Group, Cell, List, Header } from "@vkontakte/vkui";
import { OfflineBlock, Error, Spinner, PanelHeader } from "./components/components";

import green from "./assets/green.gif";
import yellow from "./assets/yellow.gif";
import red from "./assets/red.gif";

class MojangStatus extends React.Component {

    state = {
        spinner: true,
        status: null
    };

    componentDidMount() {
        axios.get("https://stevecors.herokuapp.com/https://status.mojang.com/check")
            .then(res => {
                this.setState({ status: res.data, spinner: false });
            })
            .catch(() => {
                this.setState({ error: "Произошла ошибка. Попробуйте позже.", spinner: false });
            });
    }

    render() {
        const { id, navigator } = this.props;
        const { status, error, spinner } = this.state;

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
                        status &&
                        <Group header={
                            <Header mode="secondary">Список серверов</Header>
                        }>
                            <List>
                                {
                                    servers.map((server, index) => {
                                        const data = this.state.status;

                                        const status = data[index][server.name] === "green" ?
                                            {image: green, text: "Всё в порядке"}
                                            :
                                            data[index][server.name] === "yellow" ?
                                                {image: yellow, text: "Небольшие неполадки"}
                                                :
                                                {image: red, text: "Проблемы с доступностью"};

                                        return <Cell key={index}
                                                     before={<Avatar src={status.image}/>}
                                                     description={status.text}
                                        >
                                            {server.title}
                                        </Cell>

                                    })
                                }
                            </List>
                        </Group>
                    }
                    {
                        error && <Error error={error} stretch/>
                    }
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }

}

export default MojangStatus;
