import React from "react";
import { Cell, Headline } from "@vkontakte/vkui";

export function UHC({ user }) {

    const UHC = user.stats.UHC;
    const SpeedUHC = user.stats.SpeedUHC;

    return (
        <div>
            <div className="Info-List">
                <Cell description="Монет"
                      disabled
                >
                    { UHC.coins.toLocaleString() }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                UHC
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { UHC.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { UHC.deaths.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { UHC.win_loss }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { UHC.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { UHC.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { UHC.kd }
                </Cell>
            </div>
            <Headline weight="semibold"
                      className="Info-List"
            >
                Speed UHC
            </Headline>
            <div className="Info-List">
                <Cell description="Побед"
                      disabled
                >
                    { SpeedUHC.wins.toLocaleString() }
                </Cell>
                <Cell description="Поражений"
                      disabled
                >
                    { SpeedUHC.losses.toLocaleString() }
                </Cell>
                <Cell description="П/П"
                      disabled
                >
                    { SpeedUHC.win_loss }
                </Cell>
            </div>
            <div className="Info-List">
                <Cell description="Убийств"
                      disabled
                >
                    { SpeedUHC.kills.toLocaleString() }
                </Cell>
                <Cell description="Смертей"
                      disabled
                >
                    { SpeedUHC.deaths.toLocaleString() }
                </Cell>
                <Cell description="У/С"
                      disabled
                >
                    { SpeedUHC.kd }
                </Cell>
            </div>
        </div>
    )
}
