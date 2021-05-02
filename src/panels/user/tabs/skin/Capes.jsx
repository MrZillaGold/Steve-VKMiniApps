import React, {useEffect, useState} from "react";
import Konva from "konva";
import { Div, Group, Header } from "@vkontakte/vkui";

import { EMPTY_PIXEL } from "../../../../utils";

import "./Skins.css";
import "./Capes.css";

export function Capes({ user, setUser }) {

    const [mount, setMount] = useState(true);
    const [capes, setCapes] = useState(new Array(user.textures.capes.length).fill(EMPTY_PIXEL));

    const selectCape = (index) => {
        if (user.textures.cape.selected !== index) {
            user.textures.cape.selected = index;

            setUser({
                ...user
            });
        }
    };

    const cropCapes = () => {
        user.textures.capes.forEach((cape, index) => {
            Konva.Image.fromURL(cape.url, (cape) => {
                const isMinecraft = cape.getHeight() === 32;

                const width = isMinecraft ? 10 : 20;
                const height = isMinecraft ? 16 : 32;
                const offset = isMinecraft ? 1 : 2;

                cape.crop({
                    x: offset,
                    y: offset,
                    height,
                    width
                });

                cape.width(width);
                cape.height(height);

                if (mount) {
                    capes[index] = cape.toDataURL();

                    setCapes([...capes]);
                }
            });
        });
    };

    useEffect(() => {
        cropCapes();

        return () => setMount(false);
    }, []);

    return (
        <Group mode="plain">
            <Header mode="secondary">
                Плащи
            </Header>
            <Div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    user.textures.capes.map((cape, index) => (
                        <img className={`Cape-Card Skin-Head ${user.textures.cape.selected === index && "Skin-Head_selected"}`}
                             key={cape.url}
                             title={cape.name}
                             src={capes[index]}
                             onClick={() => selectCape(index)}
                             onPointerEnter={() => selectCape(index)}
                             alt=""
                        />
                    ))
                }
            </Div>
        </Group>
    );
}
