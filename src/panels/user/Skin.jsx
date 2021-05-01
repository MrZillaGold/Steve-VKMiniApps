import React from "react";
import { Group, Div } from "@vkontakte/vkui";

import { SkinPreview } from "../../components";
import { Skins } from "./Skins";
import { Capes } from "./Capes";

export function Skin({ user, setUser }) {

    const selectedSkin = user.textures.skin.history[user.textures.skin.selected];
    const selectedCape = user.textures.capes[user.textures.cape.selected]?.url;

    const cape = selectedCape || (
        user.textures.cape.data ?
            `data:image/png;base64,${user.textures.cape.data}`
            :
            ""
    );

    return (
        <>
            <Group mode="plain">
                <Div>
                    <SkinPreview skin={selectedSkin.url}
                                 cape={cape}
                                 isSlim={selectedSkin.isSlim}
                                 username={user.username}
                                 style={{ borderRadius: 10 }}
                    />
                </Div>
            </Group>
            {
                Boolean(user.textures.skin.history.length) && <Skins user={user} setUser={setUser}/>
            }
            {
                Boolean(user.textures.capes.length) && <Capes user={user} setUser={setUser}/>
            }
        </>
    );
}
