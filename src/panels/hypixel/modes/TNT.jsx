import React from "react";
import { SimpleCell, Headline } from "@vkontakte/vkui";

import { HeightAnimation } from "../../../animation";

export default function TNT({ user }) {

    const TNT = user.stats.TNT;

    return (
        <HeightAnimation>
            <div className="Info-List">
                <SimpleCell description="Монет"
                      disabled
                >
                    { TNT.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                TNT Run
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.win_loss_ratio }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                PVP Run
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.kills.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.win_loss_ratio }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                TNT Tag
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.tnt_tag.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.tnt_tag.wins.toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Bow Spleef
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.win_loss_ratio }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Wizards
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.wizards.wins.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.wizards.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { TNT.gamemodes.wizards.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { TNT.gamemodes.wizards.kill_death_ratio }
                </SimpleCell>
            </div>
        </HeightAnimation>
    )
}
