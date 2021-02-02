import React from "react";
import { SimpleCell } from "@vkontakte/vkui";

export function SkyWars({ user }) {

    const SkyWars = user.stats.SkyWars;

    return (
        <div>
            <div className="Info-List">
                <SimpleCell description="Монет"
                      disabled
                >
                    { SkyWars.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { SkyWars.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { SkyWars.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { SkyWars.win_loss_ratio }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { SkyWars.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { SkyWars.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { SkyWars.kill_death_ratio }
                </SimpleCell>
            </div>
        </div>
    )
}
