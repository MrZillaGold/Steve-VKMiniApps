import React from "react";
import { Cell } from "@vkontakte/vkui";

export function SkyWars({ user }) {

    const SkyWars = user.stats.SkyWars;

    return (
        <div>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { SkyWars.coins.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { SkyWars.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { SkyWars.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { SkyWars.win_loss_ratio }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { SkyWars.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { SkyWars.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { SkyWars.kill_death_ratio }
                </Cell>
            </div>
        </div>
    )
}
