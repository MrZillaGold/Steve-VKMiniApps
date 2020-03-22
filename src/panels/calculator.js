import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Panel, Group, Separator, Input, FormLayout, Select, List, Cell, Button  } from "@vkontakte/vkui";
import { PanelHeader } from "./components/components";

import { resizeWindow } from "../services/_functions";

import Icon24Copy from '@vkontakte/icons/dist/24/copy';
import Icon16Done from '@vkontakte/icons/dist/16/done';

class Calculator extends React.Component {

    state = {
        x: "",
        y: "",
        z: "",
        spinner: null,
        error: null,
        rand: null,
        world: "world"
    };

    componentDidMount() {
        resizeWindow(1000)
    }

    onChange(e) {
        this.setState({ copy: false });

        const {name, value} = e.currentTarget;
        if (name === "x" || name === "z") {
            return this.setState({[name]: value.replace(/[^-0-9]/g, "").slice(0, 9) > 0 || value.replace(/[^-0-9]/g, "").slice(0, 9) === 0 ?
                    value.replace(/[^-0-9]/g, "").slice(0, 8) > 29999999 ? "29999999" : value.replace(/[^-0-9]/g, "").slice(0, 8)
                    :
                    value.replace(/[^-0-9]/g, "").slice(0, 9) < -29999999 ? "-29999999" : value.replace(/[^-0-9]/g, "").slice(0, 9)});
        }

        if (name === "y") return this.setState({[name]: value.replace(/[^0-9]/g, "").slice(0, 6) > 100000 ? "100000" : value.replace(/[^0-9]/g, "").slice(0, 6)});

        this.setState({[name]: value});
    }

    render() {
        const { id, navigator } = this.props;
        const { world, x, y, z, copy } = this.state;

        const X = x === "" || isNaN(x) ? 0 : x;
        const Y = y === "" || isNaN(y) ? 0 : y;
        const Z = z === "" || isNaN(z) ? 0 : z;

        const dimensionX = world === "nether" ? X / 8 : X * 8;
        const dimensionZ = world === "nether" ? Z / 8 : Z * 8;

        return (
            <Panel separator={false} id={id}>
                <PanelHeader status="Калькулятор координат"
                             navigator={navigator}
                             left
                />
                <FormLayout>
                    <Select name="world"
                            onChange={this.onChange.bind(this)}
                            value={world}
                            top="Мир*"
                            bottom="* Для которого необходимо просчитать координаты."
                    >
                        <option value="world">Обычный</option>
                        <option value="nether">Ад</option>
                    </Select>

                    <Input top="Координата X"
                           bottom="Целое число. (-29999999 — 29999999)"
                           name="x"
                           value={x}
                           status={x.match(/^-?[0-9]/g) || x === "" ? "default" : "error"}
                           onChange={this.onChange.bind(this)}
                           placeholder="220"
                           autoComplete="off"
                           pattern="^-?[0-9]+"
                    />
                    <Input top="Координата Y"
                           bottom="Целое число. (0 — 100000)"
                           name="y"
                           value={y}
                           status={y.match(/^[0-9]/g) || y === "" ? "default" : "error"}
                           onChange={this.onChange.bind(this)}
                           placeholder="64"
                           autoComplete="off"
                           pattern="^[0-9]+$"
                    />
                    <Input top="Координата Z"
                           bottom="Целое число. (-29999999 — 29999999)"
                           name="z"
                           value={z}
                           status={z.match(/^-?[0-9]/g) || z === "" ? "default" : "error"}
                           onChange={this.onChange.bind(this)}
                           placeholder="-113"
                           autoComplete="off"
                           pattern="^-?[0-9]+"
                    />
                    <Group>
                        <Separator/>
                        {
                            <List top={`Координаты ${world === "nether" ? "в аду" : "в обычном мире"}`}>
                                <Cell description="Координата X">
                                    {dimensionX}
                                </Cell>
                                <Cell description="Координата Y">
                                    {Y}
                                </Cell>
                                <Cell description="Координата Z">
                                    {dimensionZ}
                                </Cell>
                            </List>
                        }
                        <Separator style={{ margin: "12px 0" }} />
                        {
                            X !== "-" && Z !== "-" && (Z !== "" || Y !== "" || Z !== "") ?
                                copy ?
                                    <div style={{display: "flex"}}>
                                        <Button disabled
                                                stretched
                                                before={<Icon16Done/>}
                                        >
                                            <b>Координаты скопированы!</b>
                                        </Button>
                                    </div>
                                    :
                                    <CopyToClipboard text={`${dimensionX} ${Y} ${dimensionZ}`}>
                                        <div style={{display: "flex"}}>
                                            <Button onClick={() => this.setState({ copy: true })}
                                                    stretched
                                                    before={
                                                        <Icon24Copy width={16} height={16}/>
                                                    }
                                            >
                                                <b>Скопировать координаты</b>
                                            </Button>
                                        </div>
                                    </CopyToClipboard>
                                :
                                <div style={{display: "flex"}}>
                                    <Button disabled
                                            stretched
                                            before={
                                                <Icon24Copy width={16} height={16}/>
                                            }
                                    >
                                        <b>Скопировать координаты</b>
                                    </Button>
                                </div>
                        }
                        <Separator style={{ margin: "12px 0" }}/>
                        {
                            <List>
                                <Cell description="Номер чанка">
                                    {`${Math.floor(X / 16)}, ${Math.floor(Y / 16)}, ${Math.floor(Z / 16)}`}
                                </Cell>
                                <Cell description="Файл чанка">
                                    {`r.${Math.floor(X / 512)}.${Math.floor(Z / 512)}.mca`}
                                </Cell>
                            </List>
                        }
                    </Group>
                </FormLayout>
            </Panel>
        );
    }

}

export default Calculator;
