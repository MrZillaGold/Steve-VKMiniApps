import React from "react";
import { Div, Group, Header } from "@vkontakte/vkui";

export function InfoRow({ header, children }) {
    return (
        <Group header={
            <Header mode="secondary">
                {
                    header
                }
            </Header>
        }
               mode="plain"
        >
            <Div className="ServerCard-Line">
                {
                    children
                }
            </Div>
        </Group>
    );
}
