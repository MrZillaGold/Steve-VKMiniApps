import React from "react";
import { Cell } from "@vkontakte/vkui";
import { getRatio } from "../../../functions";

export function MurderMystery({ user }) {

    const MurderMystery = user.stats.MurderMystery;

    return (
        <div>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { MurderMystery.coins.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { MurderMystery.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений" // todo брать это значения из api после деплоя
                      disabled
                >
                    { (MurderMystery.games_played - MurderMystery.wins).toLocaleString() }
                </Cell>
                <Cell description="П/П" // todo брать это значения из api после деплоя
                      disabled
                >
                    { getRatio(MurderMystery.wins, MurderMystery.games_played - MurderMystery.wins) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { MurderMystery.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { MurderMystery.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { MurderMystery.kill_death_ratio }
                </Cell>
            </div>
        </div>
    )
}
