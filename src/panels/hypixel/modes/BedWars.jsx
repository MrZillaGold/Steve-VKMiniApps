import React from "react";
import { SimpleCell, Headline } from "@vkontakte/vkui";

import { getRatio } from "../../../utils";

export function BedWars({ user }) {

    const BedWars = user.stats.BedWars;

    return (
        <>
            <div className="Info-List">
                <SimpleCell description="Уровень"
                      disabled
                >
                    { BedWars.level }
                </SimpleCell>
                <SimpleCell description="Монет"
                      disabled
                >
                    { BedWars.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { BedWars.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { BedWars.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { BedWars.w_l }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { BedWars.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { BedWars.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { BedWars.k_d }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Одиночный
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes.solo.wins || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes.solo.losses || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.solo.wins,BedWars.gamemodes.solo.losses) }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes.solo.kills || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes.solo.deaths || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.solo.kills, BedWars.gamemodes.solo.deaths) }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Командный
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.wins || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.losses || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.doubles.wins, BedWars.gamemodes.doubles.losses) }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.kills || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes.doubles.deaths || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes.doubles.kills, BedWars.gamemodes.doubles.deaths)  }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                3v3v3v3
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].wins || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].losses || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["3v3v3v3"].wins, BedWars.gamemodes["3v3v3v3"].losses) }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].kills || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes["3v3v3v3"].deaths || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["3v3v3v3"].kills, BedWars.gamemodes["3v3v3v3"].deaths) }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                4v4v4v4
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].wins || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].losses || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["4v4v4v4"].wins, BedWars.gamemodes["4v4v4v4"].losses) }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].kills || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { (BedWars.gamemodes["4v4v4v4"].deaths || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { getRatio(BedWars.gamemodes["4v4v4v4"].kills, BedWars.gamemodes["4v4v4v4"].deaths) }
                </SimpleCell>
            </div>
        </>
    )
}
