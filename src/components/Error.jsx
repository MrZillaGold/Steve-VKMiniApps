import React, { useState } from "react";

import { Placeholder } from "@vkontakte/vkui";

import { randomInteger } from "../functions";

import { IconPug, IconPig, IconZombie } from "../icons/icons";

export function Error({ error, stretch }) {
    const [icon] = useState([<IconPug/>, <IconPig/>, <IconZombie/>][randomInteger(0, 2)]);

    return (
        <Placeholder
            stretched={stretch}
            icon={icon}
        >
            {error}
        </Placeholder>
    );
}

export default Error;
