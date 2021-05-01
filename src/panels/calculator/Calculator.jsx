import React, { useReducer } from "react";
import { Panel } from "@vkontakte/vkui";

import { CustomPanelHeader, SmartCols } from "../../components";

import { Form } from "./Form";
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

        value = value.replace(/[^-0-9]/g, "");

        switch(name) {
            case "x":
            case "z":
                setCoordinates({
                    [name]: value > 29999999 ?
                        "29999999"
                        :
                        value < -29999999 ?
                            "-29999999"
                            :
                            value
                });
                break;
            case "y":
                setCoordinates({
                    [name]: value > 384 ?
                        "384"
                        :
                        value < -64 ?
                            "-64"
                            :
                            value
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
