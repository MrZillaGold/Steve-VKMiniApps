import React from "react";
import { SimpleCell } from "@vkontakte/vkui";

import { HeightAnimation } from "../../../animation";

import { getRatio } from "../../../functions";

export default function Duels({ user }) {

    const Duels = user.stats.Duels.general;

    return (
        <HeightAnimation>
            <div className="Info-List">
                <SimpleCell description="Монет"
                      disabled
                >
                    { Duels.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { Duels.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { Duels.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { getRatio(Duels.wins, Duels.losses) }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { Duels.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { Duels.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { getRatio(Duels.kills, Duels.deaths) }
                </SimpleCell>
            </div>
        </HeightAnimation>
    )
}
