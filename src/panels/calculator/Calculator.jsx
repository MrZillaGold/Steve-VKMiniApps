import React, { useReducer } from "react";
import { Panel } from "@vkontakte/vkui";

import { CustomPanelHeader, SmartCols } from "../../components/components";

import { Form } from "./From";
import { Result } from "./Result";

export function Calculator({ id }) {
    const [coordinates, setCoordinates] = useReducer((state, coordinates) => {
        return {
            ...state,
            ...coordinates
        };
    }, {
        x: "",
        y: "",
        z: "",
        dimension: "world",
        copied: false
    });

    const inputCoordinates = (event) => {
        let { value, name } = event.currentTarget || event;

        setCoordinates({ copied: false });

        switch(name) {
            case "x":
            case "z":
                value = value.replace(/[^-0-9]/g, "");

                setCoordinates({
                    [name]: value.slice(0, 9) >= 0 ?
                        value.slice(0, 8) > 29999999 ? "29999999" : value.slice(0, 8)
                        :
                        value.slice(0, 9) < -29999999 ? "-29999999" : value.slice(0, 9)
                });
                break;
            case "y":
                value = value.replace(/[^0-9]/g, "")
                    .slice(0, 3);

                setCoordinates({
                    [name]: value > 256 ? "256" : value
                });
                break;
            default:
                setCoordinates({ [name]: value });
        }
    };

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Калькулятор координат"/>
            <SmartCols col1={
                <Form inputCoordinates={inputCoordinates}
                      {...coordinates}
                />
            }
                       col2={
                           <Result setCoordinates={setCoordinates}
                                   {...coordinates}
                           />
                       }
            />
        </Panel>
    )
}
