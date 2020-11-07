import React from "react";
import { Cell, Placeholder } from "@vkontakte/vkui";

export function SkyWars({ user }) {

    const SkyWars = user.stats.SkyWars;

    return (
        <div style={{ maxHeight: 220 }}>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { SkyWars.coins.toLocaleString() }
                </Cell>
            </div>
            <Placeholder>
                Статистика этого режима неполная, полная статистика будет доступна в будущем.
            </Placeholder>
        </div>
    )
}
