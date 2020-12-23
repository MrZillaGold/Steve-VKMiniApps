import React from "react";
import { Cell, Headline } from "@vkontakte/vkui";

export function BuildBattle({ user }) {

    const BuildBattle = user.stats.BuildBattle;

    return (
        <div>
            <div className="Info-List">
                <Cell description="Очки"
                      disabled
                >
                    { BuildBattle.score.toLocaleString() }
                </Cell>
                <Cell description="Монет"
                      disabled
                >
                    { BuildBattle.coins.toLocaleString() }
                </Cell>
                <Cell description="Побед"
                      disabled
                >
                    { BuildBattle.wins.toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Одиночный
            </Headline>
            <div className="Info-List">
                <Cell description="Побед в обычном режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_solo_normal || 0).toLocaleString() }
                </Cell>
                <Cell description="Побед в Pro-режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_solo_pro || 0).toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Командный
            </Headline>
            <div className="Info-List">
                <Cell description="Побед в обычном режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_teams_normal || 0).toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Угадай постройку
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { (BuildBattle.wins_guess_the_build || 0).toLocaleString() }
                </Cell>
                <Cell description="Угадано построек"
                      disabled
                >
                    { (BuildBattle.correct_guesses || 0).toLocaleString() }
                </Cell>
            </div>
        </div>
    )
}
