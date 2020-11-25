import React from "react";
import { Cell } from "@vkontakte/vkui";

import { getRatio } from "../../../functions";

export function Duels({ user }) {

    const Duels = user.stats.Duels.general;

    return (
        <div style={{ maxHeight: 200 }}>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { Duels.coins.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { Duels.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { Duels.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { getRatio(Duels.wins, Duels.losses) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { Duels.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { Duels.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { getRatio(Duels.kills, Duels.deaths) }
                </Cell>
            </div>
        </div>
    )
}
