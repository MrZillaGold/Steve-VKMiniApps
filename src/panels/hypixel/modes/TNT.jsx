import React from "react";
import { Cell, Placeholder } from "@vkontakte/vkui";

export function TNT({ user }) {

    const TNT = user.stats.TNT;

    return (
        <div style={{ maxHeight: 220 }}>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { TNT.coins.toLocaleString() }
                </Cell>
            </div>
            <Placeholder>
                Статистика этого режима неполная, полная статистика будет доступна в будущем.
            </Placeholder>
        </div>
    )
}
