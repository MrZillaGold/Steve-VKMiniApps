import React, { useReducer } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Panel, Group, Separator, Input, FormLayout, Select, List, Cell, Button, Card, CardGrid, Div, Headline } from "@vkontakte/vkui";
import { PanelHeader } from "../components/components";

import Icon24Copy from "@vkontakte/icons/dist/24/copy";
import Icon16Done from "@vkontakte/icons/dist/16/done";

import "./Calculator.css";

export function Calculator({ id, navigator }) {
    const [{ x, y, z, dimension, copied }, setCoordinates] = useReducer((state, coordinates) => {
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
        let { value, name } = event.currentTarget;

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

    const X = x === "" || isNaN(x) ? 0 : x;
    const Y = y === "" || isNaN(y) ? 0 : y;
    const Z = z === "" || isNaN(z) ? 0 : z;

    const dimensionX = dimension === "nether" ? X / 8 : X * 8;
    const dimensionZ = dimension === "nether" ? Z / 8 : Z * 8;

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Калькулятор координат"
                         navigator={navigator}
                         left
            />
            <FormLayout>
                <Select name="dimension"
                        onChange={inputCoordinates}
                        value={dimension}
                        top="Измерение"
                        bottom="Для которого необходимо просчитать координаты."
                >
                    <option value="world">Обычный мир</option>
                    <option value="nether">Ад</option>
                </Select>

                <Input top="Координата X"
                       bottom="Целое число. (-29999999 — 29999999)"
                       name="x"
                       value={x}
                       status={x.match(/^-?[0-9]/g) || x === "" ? "default" : "error"}
                       onChange={inputCoordinates}
                       placeholder="220"
                       autoComplete="off"
                />
                <Input top="Координата Y"
                       bottom="Целое число. (0 — 256)"
                       name="y"
                       value={y}
                       status={y.match(/^[0-9]/g) || y === "" ? "default" : "error"}
                       onChange={inputCoordinates}
                       placeholder="64"
                       autoComplete="off"
                />
                <Input top="Координата Z"
                       bottom="Целое число. (-29999999 — 29999999)"
                       name="z"
                       value={z}
                       status={z.match(/^-?[0-9]/g) || z === "" ? "default" : "error"}
                       onChange={inputCoordinates}
                       placeholder="-113"
                       autoComplete="off"
                />
            </FormLayout>
            <Separator style={{ margin: "9px 0 0 0" }}/>
            <Group>
                <CardGrid style={{ margin: "12px 0 27px 0" }}>
                    <Card size="l" mode="shadow">
                        <Div>
                            <Headline weight="semibold"
                                      style={{ marginBottom: 5 }}
                            >
                                Координаты {dimension === "nether" ? "в аду" : "в обычном мире"}
                            </Headline>
                            <List className="calculator-list">
                                <Cell description="Координата X" multiline>
                                    {Math.floor(dimensionX)}
                                </Cell>
                                <Cell description="Координата Y" multiline>
                                    {Y}
                                </Cell>
                                <Cell description="Координата Z" multiline>
                                    {Math.floor(dimensionZ)}
                                </Cell>
                            </List>
                            <List className="calculator-list">
                                <Cell description="Номер чанка">
                                    {`${Math.floor(X / 16)}, ${Math.floor(Y / 16)}, ${Math.floor(Z / 16)}`}
                                </Cell>
                                <Cell description="Файл чанка">
                                    {`r.${Math.floor(X / 512)}.${Math.floor(Z / 512)}.mca`}
                                </Cell>
                            </List>
                            <CopyToClipboard text={`${dimensionX} ${Y} ${dimensionZ}`}>
                                <div style={{ display: "flex" }}>
                                    <Button onClick={() => setCoordinates({ copied: true })}
                                            stretched
                                            before={
                                                copied ? <Icon16Done/> : <Icon24Copy width={16} height={16}/>
                                            }
                                            disabled={copied || !(x !== "-" && z !== "-" && (x !== "" || y !== "" || z !== ""))}
                                    >
                                        <b>{copied ? "Координаты скопированы!" : "Скопировать координаты"}</b>
                                    </Button>
                                </div>
                            </CopyToClipboard>
                        </Div>
                    </Card>
                </CardGrid>
            </Group>
        </Panel>
    )
}
