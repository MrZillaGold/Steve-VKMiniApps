import React from "react";
import { Cell, Headline } from "@vkontakte/vkui";

import { getRatio } from "../../../functions";

export function BedWars({ user }) {

    const BedWars = user.stats.BedWars;

    return (
        <div style={{ maxHeight: 800 }}>
            <div className="Info-List">
                <Cell description="Уровень"
                      disabled
                >
                    { BedWars.level }
                </Cell>
                <Cell description="Монет"
                      disabled
                >
                    { BedWars.coins.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { BedWars.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { BedWars.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { BedWars.w_l }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { BedWars.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { BedWars.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { BedWars.k_d }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Одиночный
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes.solo.wins || 0).toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes.solo.losses || 0).toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.solo.wins,BedWars.gamemodes.solo.losses) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes.solo.kills || 0).toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes.solo.deaths || 0).toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.solo.kills, BedWars.gamemodes.solo.deaths) }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Командный
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.wins || 0).toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.losses || 0).toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.doubles.wins, BedWars.gamemodes.doubles.losses) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.kills || 0).toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.deaths || 0).toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.doubles.kills, BedWars.gamemodes.doubles.deaths)  }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                3v3v3v3
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].wins || 0).toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].losses || 0).toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["3v3v3v3"].wins, BedWars.gamemodes["3v3v3v3"].losses) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].kills || 0).toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].deaths || 0).toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["3v3v3v3"].kills, BedWars.gamemodes["3v3v3v3"].deaths) }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                4v4v4v4
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].wins || 0).toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].losses || 0).toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["4v4v4v4"].wins, BedWars.gamemodes["4v4v4v4"].losses) }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].kills || 0).toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].deaths || 0).toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["4v4v4v4"].kills, BedWars.gamemodes["4v4v4v4"].deaths) }
                </Cell>
            </div>
        </div>
    )
}
