import React, { useEffect, useState } from "react";
import { Group, Header } from "@vkontakte/vkui";

import { HeightAnimation } from "../../animation/animation";
import { randomInteger } from "../../functions";

import { Achievement } from "./Achievement";
import { Send } from "./Send";

import spriteAsset from "../../assets/achievement/items.png";

const ITEM_SIDE_SIZE = 32;

export function Result(params) {

    const [mount, setMount] = useState(true);
    const [spriteCoordinates, setSpriteCoordinates] = useState(null);
    const [blob, setBlob] = useState(null);

    const getSpriteCoordinates = () => new Promise((resolve, reject) => {
        const sprite = new Image();
        sprite.src = spriteAsset;

        const index = randomInteger(1, 2752);

        sprite.onload = function() {
            const maxX = sprite.width / ITEM_SIDE_SIZE;

            const y = Math.trunc(index / maxX);
            const x = (index - (maxX * y)) - 1;

            const coordinates = {
                y: y * 32,
                x: x * 32,
                index
            };

            if (mount) {
                setSpriteCoordinates(coordinates);
            }

            resolve(coordinates);
        };

        sprite.onerror = reject;
    });

    useEffect(() => () => setMount(false), []);

    return (
        <Group header={
            <Header mode="secondary">
                Достижение
            </Header>
        }>
            <HeightAnimation>
                <Achievement spriteCoordinates={spriteCoordinates}
                             getSpriteCoordinates={getSpriteCoordinates}
                             ITEM_SIDE_SIZE={ITEM_SIDE_SIZE}
                             setBlob={setBlob}
                             {...params}
                />
                <Send index={spriteCoordinates?.index}
                      getSpriteCoordinates={getSpriteCoordinates}
                      blob={blob}
                      {...params}
                />
            </HeightAnimation>
        </Group>
    )
}
