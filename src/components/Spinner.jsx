import React from "react";

import { IconChest } from "../icons/icons";

export function Spinner({ style, ...rest }) {
    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", ...style }} {...rest}>
            <IconChest/>
        </div>
    )
}
