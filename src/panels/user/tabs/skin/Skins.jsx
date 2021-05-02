import React from "react";
import { Div, Group, Header, Spinner } from "@vkontakte/vkui";

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
            <Div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {
                    user.textures.skin.history.map((skin, index) =>
                        <img key={skin.url}
                             className={`Skin-Head ${user.textures.skin.selected === index && "Skin-Head_selected"}`}
                             src={skin.renders.face}
                             onClick={() => selectSkin(index)}
                             onPointerEnter={() => selectSkin(index)}
                             alt=""
                        />
                    )
                }
                {
                    !user.textures.skin.loaded && <Spinner className="Skin-Head" size="regular"/>
                }
            </Div>
        </Group>
    )
}
