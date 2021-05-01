import React from "react";
import { Group, Div } from "@vkontakte/vkui";

import { SkinPreview } from "../../components";
import { Skins } from "./Skins";

export function Skin({ user, setUser }) {

    const selectedSkin = user.textures.skin.history[user.textures.skin.selected];
    const cape = user.textures.cape.data;

    return (
        <>
            <Group mode="plain">
                <Div>
                    <SkinPreview skin={selectedSkin.url}
                                 cape={cape ? `data:image/png;base64,${cape}` : ""}
                                 isSlim={selectedSkin.isSlim}
                                 username={user.username}
                                 style={{ borderRadius: 10 }}
                    />
                </Div>
            </Group>
            {
                user.textures.skin.history.length !== 0 && <Skins user={user} setUser={setUser}/>
            }
        </>
    );
}
