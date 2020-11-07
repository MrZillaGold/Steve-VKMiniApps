import React from "react";
import { Group, Header, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon24DoneOutline, Icon24FavoriteOutline } from "@vkontakte/icons";

import { Error, Spinner } from "../../components/components";
import { HeightAnimation } from "../../animation/animation";

import { ServerCard } from "./ServerCard";

export function Info({ server, spinner, error, favorite, add }) {

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
            <HeightAnimation>
                {
                    server ?
                        <ServerCard server={server} favorite={favorite} add={add}/>
                        :
                        !spinner && !error && viewWidth > ViewWidth.MOBILE && <Error error="Информация о сервере появится здесь после ее получения."/>
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
