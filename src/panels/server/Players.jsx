import React from "react";
import { Div, Group, Header } from "@vkontakte/vkui";

export function Players({ server: { players } }) {
    return (
        <Group mode="plain"
               header={
                   <Header mode="secondary">
                       Игроки
                   </Header>
               }
        >
            <Div className="ServerCard-Line">
                {
                    players.list
                }
            </Div>
        </Group>
    );
}
