import React from "react";
import { Cell, Headline } from "@vkontakte/vkui";

export function TNT({ user }) {

    const TNT = user.stats.TNT;

    return (
        <div>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { TNT.coins.toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                TNT Run
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.tnt_run.win_loss_ratio }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                PVP Run
            </Headline>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.kills.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.pvp_run.win_loss_ratio }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                TNT Tag
            </Headline>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.tnt_tag.kills.toLocaleString() }
                </Cell>
                <Cell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.tnt_tag.wins.toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Bow Spleef
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { TNT.gamemodes.bow_spleef.win_loss_ratio }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Wizards
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { TNT.gamemodes.wizards.wins.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { TNT.gamemodes.wizards.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { TNT.gamemodes.wizards.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { TNT.gamemodes.wizards.kill_death_ratio }
                </Cell>
            </div>
        </div>
    )
}
