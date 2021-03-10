import React from "react";
import { SimpleCell, Headline } from "@vkontakte/vkui";

export function UHC({ user }) {

    const UHC = user.stats.UHC;
    const SpeedUHC = user.stats.SpeedUHC;

    return (
        <>
            <div className="Info-List">
                <SimpleCell description="Монет"
                      disabled
                >
                    { UHC.coins.toLocaleString() }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                UHC
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { UHC.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { UHC.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { UHC.win_loss }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { UHC.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { UHC.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { UHC.kd }
                </SimpleCell>
            </div>
            <Headline weight="semibold"
                      className="Info-Title"
            >
                Speed UHC
            </Headline>
            <div className="Info-List">
                <SimpleCell description="Побед"
                      disabled
                >
                    { SpeedUHC.wins.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Поражений"
                      disabled
                >
                    { SpeedUHC.losses.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="П/П"
                      disabled
                >
                    { SpeedUHC.win_loss }
                </SimpleCell>
            </div>
            <div className="Info-List">
                <SimpleCell description="Убийств"
                      disabled
                >
                    { SpeedUHC.kills.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="Смертей"
                      disabled
                >
                    { SpeedUHC.deaths.toLocaleString() }
                </SimpleCell>
                <SimpleCell description="У/С"
                      disabled
                >
                    { SpeedUHC.kd }
                </SimpleCell>
            </div>
        </>
    )
}
