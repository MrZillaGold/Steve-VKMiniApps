import React, { useReducer } from "react";
import { Panel, SplitLayout, SplitCol, withAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { CustomPanelHeader } from "../../components/components";

import { Form } from "./From";
import { Result } from "./Result";

export const Calculator = withAdaptivity(({ id, viewWidth }) => {
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

    let CalculatorForm = <Form key="CalculatorForm" inputCoordinates={inputCoordinates} {...coordinates}/>
    let CalculatorResult = <Result key="CalculatorResult" setCoordinates={setCoordinates} {...coordinates}/>

    if (viewWidth > ViewWidth.MOBILE) {
        CalculatorForm = (
            <SplitCol width={`${viewWidth === ViewWidth.SMALL_TABLET ? 40 : 80}px`}
                      key="CalculatorForm"
                      spaced
            >
                {
                    CalculatorForm
                }
            </SplitCol>
        )
        CalculatorResult = (
            <SplitCol spaced
                      key="CalculatorResult"
            >
                {
                    CalculatorResult
                }
            </SplitCol>
        )
    }

    const CalculatorChild = [
            CalculatorForm,
            CalculatorResult
    ];

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Калькулятор координат"/>
            {
                viewWidth > ViewWidth.MOBILE ?
                    <SplitLayout>
                        {CalculatorChild}
                    </SplitLayout>
                    :
                    CalculatorChild
            }
        </Panel>
    )
}, {
    viewWidth: true
})
