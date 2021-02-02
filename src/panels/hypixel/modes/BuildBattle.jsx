import React from "react";
import { SimpleCell, Headline } from "@vkontakte/vkui";

export function BuildBattle({ user }) {

    const BuildBattle = user.stats.BuildBattle;

    return (
        <div>
            <div className="Info-List">
                <SimpleCell description="Очки"
                      disabled
                >
                    { BuildBattle.score.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Монет"
                      disabled
                >
                    { BuildBattle.coins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Побед"
                      disabled
                >
                    { BuildBattle.wins.toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Одиночный
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед в обычном режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_solo_normal || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Побед в Pro-режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_solo_pro || 0).toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Командный
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед в обычном режиме"
                      multiline
                      disabled
                >
                    { (BuildBattle.wins_teams_normal || 0).toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Угадай постройку
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { (BuildBattle.wins_guess_the_build || 0).toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Угадано построек"
                      disabled
                >
                    { (BuildBattle.correct_guesses || 0).toLocaleString() }
                </SimpleCell>
            </div>
        </div>
    )
}
