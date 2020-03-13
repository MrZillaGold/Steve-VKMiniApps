import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Panel, PanelHeaderContent, Group, Separator, Input, FormLayout, FormLayoutGroup, List, Cell, Button, Div, FormStatus, PanelHeaderButton, PanelHeaderSimple, Avatar } from "@vkontakte/vkui";
import HeaderButtons from "./components/headerbuttons";

import { IconSteve } from "./components/icons";
import Icon24Copy from "@vkontakte/icons/dist/24/copy";
import Icon16Done from "@vkontakte/icons/dist/16/done";

class EnderPortalCalculator extends React.Component {

    state = {
        a1: "",
        a2: "",
        x1: "",
        x2: "",
        z1: "",
        z2: ""
    };

    onChange(e) {
        this.setState({ copy: false });

        const {name, value} = e.currentTarget;
        if (name === "x1" || name === "x2" || name === "z1" || name === "z2") {
            this.setState({[name]: value.replace(/[^-0-9]/g, "") > 0 || value.replace(/[^-0-9]/g, "") === 0 ?
                    value.replace(/[^-0-9]/g, "").slice(0, 8) > 29999999 ? "29999999" : value.replace(/[^-0-9]/g, "").slice(0, 8)
                    :
                    value.replace(/[^-0-9]/g, "").slice(0, 9) < -29999999 ? "-29999999" : value.replace(/[^-0-9]/g, "").slice(0, 9)});
        }
        if (name === "a1" || name === "a2") {
            this.setState({[name]: value.replace(/[^-0-9]/g, "").slice(0, 4) > 0 || value.replace(/[^-0-9]/g, "").slice(0, 4) === 0 ?
                    value.replace(/[^-0-9]/g, "").slice(0, 3) > 360 ? "360" : value.replace(/[^-0-9]/g, "").slice(0, 3)
                    :
                    value.replace(/[^-0-9]/g, "").slice(0, 4) < -360 ? "-360" : value.replace(/[^-0-9]/g, "").slice(0, 4)});
        }
    }

    render() {
        const {id, navigator} = this.props;

        const p = Math.PI/180;
        const a1 = parseFloat(this.state.a1);
        const a2 = parseFloat(this.state.a2);
        const x1 = parseInt(this.state.x1);
        const z1 = parseInt(this.state.z1);
        const x2 = parseInt(this.state.x2);
        const z2 = parseInt(this.state.z2);

        let xOut = 0;
        let zOut = 0;

        function cot(x) {
            return 1 / Math.tan(x);
        }
        if (Math.abs(a1 - a2) < 1) {
            console.log("Углы не могут быть равны!");
        } else if ((((a1 < 0) && (a2 > 0)) || ((a1 > 0) && (a2 < 0))) && (Math.abs(Math.abs(Math.abs(a1) - 180) - Math.abs(a2)) < 1)) {
            console.log("Углы не могут быть противоположный!");
        } else {
            switch (Math.round(a1)) {
                case -180:
                case 0:
                case 180:
                    xOut = Math.round(x1);
                    zOut = Math.round(cot(-a2 * p) * x1 - (x2 * cot(-a2 * p) - z2));
                    break;
                case -90:
                case 90:
                    zOut = Math.round(z1);
                    xOut = (Math.round(x2 * cot(-a2 * p) - z2 + z1) / cot(-a2 * p));
                    break;
                default:
                    switch (Math.round(a2)) {
                        case -180:
                        case 0:
                        case 180:
                            xOut = Math.round(x2);
                            zOut = Math.round(cot(-a1 * p) * x2 - (x1 * cot(-a1 * p) - z1));
                            break;
                        case -90:
                        case 90:
                            zOut = Math.round(z2);
                            xOut = Math.round((x1 * cot(-a1 * p) - z1 + z2) / cot(-a1 * p));
                            break;
                        default:
                            xOut = Math.round(((x1 * cot(-a1 * p) - z1) - (x2 * cot(-a2 * p) - z2)) / (cot(-a1 * p) - cot(-a2 * p)));
                            zOut = Math.round(cot(-a1 * p) * xOut - (x1 * cot(-a1 * p) - z1));
                    }
            }
        }

        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple separator={false}
                                   left={
                                       <PanelHeaderButton onClick={() => navigator.goBack()}>
                                           <HeaderButtons/>
                                       </PanelHeaderButton>
                                   }
                >
                    <PanelHeaderContent status="Координаты крепости"
                                        before={
                                            <Avatar id="steve-head"
                                                    size={36}
                                            >
                                                <IconSteve/>
                                            </Avatar>
                                        }
                    >
                        Steve
                    </PanelHeaderContent>
                </PanelHeaderSimple>
                <FormLayout>
                    {
                        (Math.abs(a1 - a2) < 1 || a1 === a2 / -1 || a1 / -1 === a2) &&
                        <FormStatus header="Некорректные данные"
                                    mode="error"
                        >
                            {
                                a1 === a2 ?
                                    (a1 === a2 / -1 || a1 / -1 === a2) ?
                                        "Углы не могут быть противоположными!" : "Углы не могут быть равны!"
                                    :
                                    "Углы не могут быть противоположными!"
                            }
                        </FormStatus>
                    }
                    <FormLayoutGroup top="Бросок #1">
                        <div style={{display: "flex"}}>
                            <div style={{flexGrow: 4, marginRight: "10px"}}>
                                <Input
                                    name='x1'
                                    value={this.state.x1}
                                    status={this.state.x1.match(/^-?[0-9]/g) || this.state.x1 === "" ? "default" : "error"}
                                    onChange={this.onChange.bind(this)}
                                    placeholder="X"
                                />
                            </div>
                            <div style={{flexGrow: 4, marginRight: "10px"}}>
                                <Input
                                    name='z1'
                                    value={this.state.z1}
                                    status={this.state.z1.match(/^-?[0-9]/g) || this.state.z1 === "" ? "default" : "error"}
                                    onChange={this.onChange.bind(this)}
                                    placeholder="Z"
                                />
                            </div>
                            <div style={{flexGrow: 1, marginRight: "10px"}}>
                                <Input
                                    name='a1'
                                    value={this.state.a1}
                                    status={this.state.a1.match(/^-?[0-9]/g) || this.state.a1 === "" ? "default" : "error"}
                                    onChange={this.onChange.bind(this)}
                                    placeholder="Угол"
                                />
                            </div>
                        </div>
                    </FormLayoutGroup>
                    <FormLayoutGroup top="Бросок #2">
                        <div style={{display: "flex"}}>
                            <div style={{flexGrow: 4, marginRight: "10px"}}>
                                <Input name="x2"
                                       value={this.state.x2}
                                       status={this.state.x2.match(/^-?[0-9]/g) || this.state.x2 === "" ? "default" : "error"}
                                       onChange={this.onChange.bind(this)}
                                       placeholder="X"
                                />
                            </div>
                            <div style={{flexGrow: 4, marginRight: "10px"}}>
                                <Input name='z2'
                                       value={this.state.z2}
                                       status={this.state.z2.match(/^-?[0-9]/g) || this.state.z2 === "" ? "default" : "error"}
                                       onChange={this.onChange.bind(this)}
                                       placeholder="Z"
                                />
                            </div>
                            <div style={{flexGrow: 1, marginRight: "10px"}}>
                                <Input name="a2"
                                       value={this.state.a2}
                                       status={this.state.a2.match(/^-?[0-9]/g) || this.state.a2 === "" ? "default" : "error"}
                                       onChange={this.onChange.bind(this)}
                                       placeholder="Угол"
                                />
                            </div>
                        </div>
                    </FormLayoutGroup>
                </FormLayout>
                <Group title="Координаты крепости">
                    {
                        <List>
                            <Cell description='Координата X'>
                                {isNaN(xOut) ? 0 : a1 === a2 || (a1 === a2 / -1 || a1 / -1 === a2) ? 0 : xOut}
                            </Cell>
                            <Cell description='Координата Z'>
                                {isNaN(zOut) ? 0 : a1 === a2 || (a1 === a2 / -1 || a1 / -1 === a2) ? 0 : zOut}
                            </Cell>
                        </List>
                    }
                    <Separator/>
                    <Div>
                        {
                            this.state.a1 !== "-" && this.state.a2 !== "-" && this.state.x1 !== "-" && this.state.x2 !== "-" && this.state.z1 !== "-" && this.state.z2 !== "-" && this.state.a1 !== "" && this.state.x1 !== "" && this.state.z1 !== "" && this.state.a2 !== "" && this.state.x2 !== "" && this.state.z2 !== "" && a1 !== a2 && (a1 !== a2 / -1 || a1 / -1 !== a2) ?
                                this.state.copy ?
                                    <div style={{display: 'flex'}}>
                                        <Button disabled
                                                stretched
                                                before={
                                                    <Icon16Done/>
                                                }
                                        >
                                            <b>Координаты скопированы!</b>
                                        </Button>
                                    </div>
                                    :
                                    <CopyToClipboard text={`${isNaN(xOut) ? 0 : a1 === a2 || (a1 === a2 / -1 || a1 / -1 === a2) ? 0 : xOut} ~ ${isNaN(zOut) ? 0 : a1 === a2 || (a1 === a2 / -1 || a1 / -1 === a2) ? 0 : zOut}`}>
                                        <div style={{display: 'flex'}}>
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
                                <div style={{display: 'flex'}}>
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
                    </Div>
                </Group>
                <div style={{display: 'flex'}}>
                    <Button mode="tertiary"
                            stretched
                            target="_blank"
                            href="https://youtu.be/U6pEgIKAuJI"
                    >
                        <b>Как находить координаты и угол?</b>
                    </Button>
                </div>
            </Panel>
        );
    }

}

export default EnderPortalCalculator;
