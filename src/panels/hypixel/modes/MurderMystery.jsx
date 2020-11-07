import React from "react";
import { Cell, Placeholder } from "@vkontakte/vkui";

export function MurderMystery({ user }) {

    const MurderMystery = user.stats.MurderMystery;

    return (
        <div style={{ maxHeight: 220 }}>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { MurderMystery.coins.toLocaleString() }
                </Cell>
            </div>
            <Placeholder>
                Статистика этого режима неполная, полная статистика будет доступна в будущем.
            </Placeholder>
        </div>
    )
}
