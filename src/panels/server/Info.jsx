import React from "react";
import { Group, Header, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon24DoneOutline, Icon24FavoriteOutline } from "@vkontakte/icons";

import { Error, Spinner } from "../../components/components";

import { ServerCard } from "./ServerCard";

export function Info({ server, spinner, error, favorite, add, setScrollUp }) {

    const { viewWidth } = useAdaptivity();

    return (
        <Group header={
            server && <Header aside={
                favorite.includes(server.ip) ?
                    <Icon24DoneOutline style={{ opacity: ".2" }}/>
                    :
                    <Icon24FavoriteOutline onClick={() => add(server.ip)}/>
            }
                              mode="secondary"
            >
                {
                    server.ip
                }
            </Header>
        }>
            {
                server ?
                    <ServerCard server={server} favorite={favorite} add={add} setScrollUp={setScrollUp}/>
                    :
                    !spinner && !error && viewWidth > ViewWidth.MOBILE && <Error error="Информация о сервере появится здесь после ее получения."/>
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
