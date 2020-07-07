import React, { useState } from "react";

import { Button, Placeholder } from "@vkontakte/vkui";
import { randomInteger } from "../functions";
import { IconPug, IconPig, IconZombie } from "../icons/icons";


export function OfflineBlock() {
    const [icon] = useState([<IconPug/>, <IconPig/>, <IconZombie/>][randomInteger(0, 2)]);

    return (
        <Placeholder stretched
                     title="Упс..."
                     icon={icon}
                     action={
                         <Button size="l" stretched target="_blank" href="https://vk.com/stevebotmc">
                             <b>Группа</b>
                         </Button>
                     }
        >
            Пропало подключение к серверу!
            <br/>
            <br/>
            Эта вкладка будет доступна как появится соединение.
        </Placeholder>
    )
}
