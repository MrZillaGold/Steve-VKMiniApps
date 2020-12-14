import React, { useEffect, useState } from "react";
import Konva from "konva";
import chunk from "fast-chunk-string";
import { Group } from "@vkontakte/vkui";

import { loadImage } from "../../functions";

import headerAsset from "../../assets/header.png";
import backgroundAsset from "../../assets/background.png";
import footerAsset from "../../assets/footer.png";
import spriteAsset from "../../assets/items.png";

import "./Achievement.css";

export function Achievement({ title, body, spriteCoordinates, getSpriteCoordinates, ITEM_SIDE_SIZE, setBlob }) {

    const [mount, setMount] = useState(true);

    const text = body ?
        chunk(body, {
            size: 20,
            unicodeAware: false
        })
        :
        [""];

    const generate = async () => {
        const stage = new Konva.Stage({
            container: "achievement",
            width: 320,
            height: text.length * 20 + 44
        });

        const headerLayer = new Konva.Layer();
        const backgroundLayer = new Konva.Layer();
        const footerLayer = new Konva.Layer();

        await Promise.all([
            loadImage(headerAsset),
            loadImage(backgroundAsset),
            loadImage(footerAsset),
            loadImage(spriteAsset)
        ])
            .then(async ([header, background, footer, sprite]) => {
                const headerImage = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: header,
                    height: 8,
                    width: 320
                });

                headerLayer.add(headerImage);
                headerLayer.batchDraw();

                const backgroundImage = new Konva.Image({
                    x: 0,
                    y: 8,
                    image: background,
                    height: text.length * 20 + 28,
                    width: 320
                });

                backgroundLayer.add(backgroundImage);
                backgroundLayer.batchDraw();

                const footerImage = new Konva.Image({
                    x: 0,
                    y: text.length * 20 + 36,
                    image: footer,
                    height: 8,
                    width: 320
                });

                headerLayer.add(footerImage);
                headerLayer.batchDraw();

                const { x, y } = spriteCoordinates ?? await getSpriteCoordinates();

                const itemImage = new Konva.Image({
                    x: 16,
                    y: 16,
                    width: 32,
                    height: 32,
                    image: sprite,
                    cropX: x,
                    cropY: y,
                    cropWidth: ITEM_SIDE_SIZE,
                    cropHeight: ITEM_SIDE_SIZE
                });

                backgroundLayer.add(itemImage);
                backgroundLayer.batchDraw();
            })
            .catch((error) => console.log(error))

        backgroundLayer.add(new Konva.Text({
            x: 60,
            y: body !== "" ? 10 : 20,
            text: title,
            fontSize: 20,
            fontFamily: "Minecraft Seven",
            fill: "yellow"
        }));

        text.map((line) => line.trim())
            .forEach((line, index) => {
                const text = new Konva.Text({
                    x: 60,
                    y: 20 * (index + 1) + 12,
                    text: line,
                    fontSize: 20,
                    fontFamily: "Minecraft Seven",
                    fill: "white"
                });

                backgroundLayer.add(text);
            });

        stage.add(headerLayer);
        stage.add(backgroundLayer);
        stage.add(footerLayer);

        if (mount) {
            setBlob(stage.toDataURL());
        }
    };

    useEffect(() => {
        generate();
    }, [title, body, spriteCoordinates]);

    useEffect(() => () => setMount(false), []);

    return (
        <Group mode="plain">
            <div style={{ height: text.length * 20 + 44 }}>
                <div className="Achievement"
                     id="achievement"
                />
            </div>
        </Group>
    )
}