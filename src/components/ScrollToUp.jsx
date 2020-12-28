import React from "react";

import { Button, FixedLayout } from "@vkontakte/vkui";
import { Icon28ArrowUpOutline } from "@vkontakte/icons";

import "./ScrollToUp.css";

export function ScrollToUp({ scrollUp }) {

    const scrollToUp = () => {
        window.scrollTo(0, 0);
    };

    return (
        <FixedLayout vertical="bottom"
                     className={`ScrollToUp-Up ${scrollUp ? "ScrollToUp-Up-Show" : ""}`}
        >
            <Button size="l"
                    mode="secondary"
                    className="ScrollToUp-Up-Button"
                    onClick={scrollToUp}
            >
                <Icon28ArrowUpOutline/>
            </Button>
        </FixedLayout>
    );
}
