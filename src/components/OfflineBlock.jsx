import React from "react";

import { Button } from "@vkontakte/vkui";

import { Error } from "./Error";

export function OfflineBlock() {
    return (
        <Error header="Упс..."
               action={
                   <Button size="l"
                           stretched
                           target="_blank"
                           mode="tertiary"
                           href="https://vk.com/stevebotmc"
                   >
                       Группа
                   </Button>
               }
        >
            Пропало подключение к серверу!
            <br/>
            Эта вкладка будет доступна как появится соединение.
        </Error>
    );
}
