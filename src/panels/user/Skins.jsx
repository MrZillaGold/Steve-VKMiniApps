import React from "react";
import { Div, Group, Header } from "@vkontakte/vkui";

import "./Skins.css";

export function Skins({ user, setUser }) {

    const selectSkin = (index) => {
        if (user.textures.skin.selected !== index) {
            user.textures.skin.selected = index;

            setUser({
                ...user
            });
        }
    };

    return (
        <Group mode="plain">
            <Header mode="secondary">
                Скины
            </Header>
            <Div style={{ textAlign: "center" }}>
                {
                    user.textures.skin.history.map((skin, index) =>
                        <img key={skin.url}
                             className={`Skins-Head ${user.textures.skin.selected === index && "Skins-Head_selected"}`}
                             src={skin.renders.face}
                             onClick={() => selectSkin(index)}
                             onPointerEnter={() => selectSkin(index)}
                             alt=""
                        />
                    )
                }
            </Div>
        </Group>
    )
}
