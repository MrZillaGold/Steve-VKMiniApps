import React from "react";
import { Div, Group, Header } from "@vkontakte/vkui";

export function Core({ server: { version } }) {
    return (
        <Group header={
            <Header mode="secondary">
                Ядро сервера
            </Header>
        }
               mode="plain"
        >
            <Div className="ServerCard-Line">
                {
                    version
                }
            </Div>
        </Group>
    );
}
