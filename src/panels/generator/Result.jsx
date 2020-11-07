import React, { useEffect, useState } from "react";
import { Group, Header } from "@vkontakte/vkui";

import { HeightAnimation } from "../../animation/animation";
import { randomInteger } from "../../functions";

import { Achievement } from "./Achievement";
import { Send } from "./Send";

import spriteAsset from "../../assets/items.png";

const ITEM_SIDE_SIZE = 32;

export function Result({ title, body }) {

    const [mount, setMount] = useState(true);
    const [spriteCoordinates, setSpriteCoordinates] = useState(null);

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

        sprite.onerror = () => {
            reject("Ошибка при загрузке спрайта.");
        };
    });

    useEffect(() => () => setMount(false), []);

    return (
        <Group header={
            <Header mode="secondary">
                Достижение
            </Header>
        }>
            <HeightAnimation>
                <Achievement title={title} body={body} spriteCoordinates={spriteCoordinates} getSpriteCoordinates={getSpriteCoordinates} ITEM_SIDE_SIZE={ITEM_SIDE_SIZE}/>
                <Send title={title} body={body} index={spriteCoordinates?.index} getSpriteCoordinates={getSpriteCoordinates}/>
            </HeightAnimation>
        </Group>
    )
}
