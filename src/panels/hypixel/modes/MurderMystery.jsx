import React from "react";
import { SimpleCell } from "@vkontakte/vkui";

export function MurderMystery({ user }) {

    const MurderMystery = user.stats.MurderMystery;

    return (
        <div>
            <div className="Info-List">
                <SimpleCell description="Монет"
                      disabled
                >
                    { MurderMystery.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { MurderMystery.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { MurderMystery.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { MurderMystery.win_loss_ratio }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { MurderMystery.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { MurderMystery.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { MurderMystery.kill_death_ratio }
                </SimpleCell>
            </div>
        </div>
    )
}
