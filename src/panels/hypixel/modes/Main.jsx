import React from "react";
import { Cell } from "@vkontakte/vkui";

import { timeConvert } from "../../../functions";

export function Main({ user }) {
    return (
        <div style={{ maxHeight: 200 }}>
            <div className="Info-List">
                <Cell description="Статус"
                      disabled
                >
                    { user.online ? "Онлайн" : "Оффлайн" }
                </Cell>
                <Cell description="Уровень"
                      disabled
                >
                    { Math.trunc(user.level) }
                </Cell>
                <Cell description="Очки достижений"
                      disabled
                >
                    { user.achievement_points.toLocaleString() }
                </Cell>
            </div>
            <div className="Info-List">
                { !user.online &&
                <Cell description="Последний вход"
                      disabled
                >
                    { user.last_login ? timeConvert(user.last_login) : "Неизвестно" }
                </Cell>
                }
                <Cell description="Первый вход"
                      disabled
                >
                    { user.first_login ? timeConvert(user.first_login) : "Неизвестно" }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Последняя игра"
                      disabled
                >
                    { user.last_game ?? "Неизвестно"  }
                </Cell>
                <Cell description="Карма"
                      disabled
                >
                    { user.karma.toLocaleString() }
                </Cell>
            </div>
        </div>
    )
}
