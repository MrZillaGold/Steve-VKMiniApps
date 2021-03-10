import React from "react";
import { SimpleCell } from "@vkontakte/vkui";

import { timeConvert } from "../../../functions";

export function Main({ user }) {
    return (
        <>
            <div className="Info-List">
                <SimpleCell description="Статус"
                      disabled
                >
                    { user.online ? "Онлайн" : "Оффлайн" }
                </SimpleCell>
                <SimpleCell description="Уровень"
                      disabled
                >
                    { Math.trunc(user.level) }
                </SimpleCell>
                <SimpleCell description="Очки достижений"
                      disabled
                >
                    { user.achievement_points.toLocaleString() }
                </SimpleCell>
            </div>
            <div className="Info-List">
                { !user.online &&
                <SimpleCell description="Последний вход"
                      disabled
                >
                    { user.last_login ? timeConvert(user.last_login) : "Неизвестно" }
                </SimpleCell>
                }
                <SimpleCell description="Первый вход"
                      disabled
                >
                    { user.first_login ? timeConvert(user.first_login) : "Неизвестно" }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Последняя игра"
                      disabled
                >
                    { user.last_game ?? "Неизвестно"  }
                </SimpleCell>
                <SimpleCell description="Карма"
                      disabled
                >
                    { user.karma.toLocaleString() }
                </SimpleCell>
            </div>
        </>
    )
}
