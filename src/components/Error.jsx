import React, { useEffect, useState } from "react";

import { Placeholder } from "@vkontakte/vkui";

import { IconPug, IconPig, IconZombie } from "../icons/icons";

import { randomInteger } from "../functions";

export function Error({ error, children, ...rest }) {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIcon([<IconPug/>, <IconPig/>, <IconZombie/>][randomInteger(0, 2)]);
    }, []);

    return (
        <Placeholder icon={icon}
                     {...rest}
        >
            {
                error || children
            }
        </Placeholder>
    );
}
