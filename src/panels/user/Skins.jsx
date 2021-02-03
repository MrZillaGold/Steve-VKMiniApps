import React from "react";
import { Div, Group, Header } from "@vkontakte/vkui";

import "./Skins.css";

export function Skins({ user, setUser }) {

    const selectSkin = (skin, index) => {
        if (user.skin.selected - 1 !== index) {
            setUser({
                ...user,
                skin: {
                    ...user.skin,
                    isSlim: skin.isSlim,
                    url: skin.url,
                    selected: index + 1
                }
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
                    user.skin.history.map((skin, index) =>
                        <img key={skin.url}
                             className={`Skins-Head ${user.skin.selected - 1 === index && "Skins-Head_selected"}`}
                             src={skin.renders.face.replace("https://stevecors.herokuapp.com/", "")}
                             onClick={() => selectSkin(skin, index)}
                             onPointerEnter={() => selectSkin(skin, index)}
                             alt=""
                        />
                    )
                }
            </Div>
        </Group>
    )
}
