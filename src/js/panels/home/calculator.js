import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Group, Separator, Input, FormLayout, Select, List, Cell, Button} from "@vkontakte/vkui";
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
        copy: false,
        world: "world"
    };

    onChange(e) {
        this.setState({ copy: false });

        const {name, value} = e.currentTarget;
        if (name === "x" || name === "z") {
            return this.setState({[name]: value.replace(/[^-0-9]/g, "").slice(0, 9) > 0 || value.replace(/[^-0-9]/g, "").slice(0, 9) === 0 ?
                    value.replace(/[^-0-9]/g, "").slice(0, 8) > 29999999 ? "29999999" : value.replace(/[^-0-9]/g, "").slice(0, 8)
                    :
                    value.replace(/[^-0-9]/g, "").slice(0, 9) < -29999999 ? "-29999999" : value.replace(/[^-0-9]/g, "").slice(0, 9)});
        }
        if (name === "y") {
            return this.setState({[name]: value.replace(/[^0-9]/g, "").slice(0, 6) > 100000 ? "100000" : value.replace(/[^0-9]/g, "").slice(0, 6)});
        }
        this.setState({[name]: value});
    }

    render() {

        const {world, id, goBack} = this.props;

        const x = this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]') ? this.state.world === 'nether' ? Math.floor(this.state.x / 8) : Math.floor(this.state.x * 8) : '0';
        const y = this.state.y === '' ? '0' : this.state.y.match('^[0-9]') ? this.state.y : '0';
        const z = this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]') ? this.state.world === 'nether' ? Math.floor(this.state.z / 8) : Math.floor(this.state.z * 8) : '0';

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Калькулятор">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <FormLayout>
                    <Select name="world" onChange={this.onChange.bind(this)} value={world} top="Мир*" bottom='* Для которого необходимо просчитать координаты.'>
                        <option value="world">Обычный</option>
                        <option value="nether">Ад</option>
                    </Select>

                    <Input
                        top='Координата X'
                        bottom='Целое число. (-29999999 — 29999999)'
                        name='x'
                        value={this.state.x}
                        status={this.state.x.match(/^-?[0-9]/g) || this.state.x === "" ? 'default' : 'error'}
                        onChange={this.onChange.bind(this)}
                        placeholder="220"
                        autocomplete="off"
                        pattern='^-?[0-9]+'
                    />
                    <Input
                        top='Координата Y'
                        bottom='Целое число. (0 — 100000)'
                        name='y'
                        value={this.state.y}
                        status={this.state.y.match(/^[0-9]/g) || this.state.y === "" ? 'default' : 'error'}
                        onChange={this.onChange.bind(this)}
                        placeholder="64"
                        autocomplete="off"
                        pattern='^[0-9]+$'
                    />
                    <Input
                        top='Координата Z'
                        bottom='Целое число. (-29999999 — 29999999)'
                        name='z'
                        value={this.state.z}
                        status={this.state.z.match(/^-?[0-9]/g) || this.state.z === "" ? 'default' : 'error'}
                        onChange={this.onChange.bind(this)}
                        placeholder="-113"
                        autocomplete="off"
                        pattern='^-?[0-9]+'
                    />
                    <Group>
                        {
                            <List top={this.state.world === 'nether' ? 'Координаты в аду' : 'Координаты в обычном мире'}>
                                <Cell description='Координата X'>
                                    {x}
                                </Cell>
                                <Cell description='Координата Y'>
                                    {y}
                                </Cell>
                                <Cell description='Координата Z'>
                                    {z}
                                </Cell>
                            </List>
                        }
                        <Separator style={{ margin: '12px 0' }} />
                        {
                            this.state.copy ?
                                <div style={{display: 'flex'}}>
                                    <Button disabled stretched level="primary" before={<Icon16Done />}>Координаты скопированы!</Button>
                                </div>
                                :
                                <CopyToClipboard text={`${x} ${y} ${z}`}>
                                    <div style={{display: 'flex'}}>
                                        <Button onClick={() => this.setState({ copy: true })} stretched level="primary" before={<Icon24Copy width={16} height={16}/>}>Скопировать координаты</Button>
                                    </div>
                                </CopyToClipboard>
                        }
                        <Separator style={{ margin: '12px 0' }} />
                        {
                            <List>
                                <Cell description='Номер чанка'>
                                    {`${this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]') ? Math.floor(this.state.x / 16) : '0'}, ${this.state.y === '' ? '0' : this.state.y.match('^[0-9]') ? Math.floor(this.state.y / 16) : '0'}, ${this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]') ? Math.floor(this.state.z / 16) : '0'}`}
                                </Cell>
                                <Cell description='Файл чанка'>
                                    {`r.${this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]') ? Math.floor(this.state.x / 512) : '0'}.${this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]') ? Math.floor(this.state.z / 512) : '0'}.mca`}
                                </Cell>
                            </List>
                        }
                    </Group>
                </FormLayout>
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Calculator);
