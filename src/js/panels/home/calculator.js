import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Input, FormLayout, Select, List, Cell } from "@vkontakte/vkui";

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

    onChange(e) {
        const {name, value} = e.currentTarget;
        if (name === "x" || name === "z") {
            return this.setState({[name]: value.replace(/[^-0-9]+$/g, "").slice(0, 9) > 0 || value.replace(/[^-0-9]+$/g, "").slice(0, 9) === 0 ?
                        value.replace(/[^-0-9]+$/g, "").slice(0, 8) > 29999999 ? "29999999" : value.replace(/[^-0-9]+$/g, "").slice(0, 8)
                        :
                        value.replace(/[^-0-9]+$/g, "").slice(0, 9) < -29999999 ? "-29999999" : value.replace(/[^-0-9]+$/g, "").slice(0, 9)});
        }
        if (name === "y") {
            return this.setState({[name]: value.replace(/[^0-9]+$/g, "").slice(0, 6) > 100000 ? "100000" : value.replace(/[^0-9]+$/g, "").slice(0, 6)});
        }
        this.setState({[name]: value});
    }

    render() {

        const {world, id, goBack} = this.props;

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
                        status={this.state.x.match(/^-?[0-9]+$/g) || this.state.x === "" ? 'default' : 'error'}
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
                        status={this.state.y.match(/^[0-9]+$/g) || this.state.y === "" ? 'default' : 'error'}
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
                        status={this.state.z.match(/^-?[0-9]+$/g) || this.state.z === "" ? 'default' : 'error'}
                        onChange={this.onChange.bind(this)}
                        placeholder="-113"
                        autocomplete="off"
                        pattern='^-?[0-9]+'
                    />
                    {
                        <List top={this.state.world === 'nether' ? 'Координаты в аду' : 'Координаты в обычном мире'}>
                            <Cell description='Координата X'>
                                {this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]+$') ? this.state.world === 'nether' ? Math.floor(this.state.x / 8) : Math.floor(this.state.x * 8) : 'Задано неверное значение'}
                            </Cell>
                            <Cell description='Координата Y'>
                                {this.state.y === '' ? '0' : this.state.y.match('^[0-9]+$') ? this.state.y : 'Задано неверное значение'}
                            </Cell>
                            <Cell description='Координата Z'>
                                {this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]+$') ? this.state.world === 'nether' ? Math.floor(this.state.z / 8) : Math.floor(this.state.z * 8) : 'Задано неверное значение'}
                            </Cell>
                        </List>
                    }
                    {
                        <List>
                            <Cell description='Номер чанка'>
                                {`${this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]+$') ? Math.floor(this.state.x / 16) : '0'}, ${this.state.y === '' ? '0' : this.state.y.match('^[0-9]+$') ? Math.floor(this.state.y / 16) : '0'}, ${this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]+$') ? Math.floor(this.state.z / 16) : '0'}`}
                            </Cell>
                            <Cell description='Файл чанка'>
                                {`r.${this.state.x === '' ? '0' : this.state.x.match('^-?[0-9]+$') ? Math.floor(this.state.x / 512) : '0'}.${this.state.z === '' ? '0' : this.state.z.match('^-?[0-9]+$') ? Math.floor(this.state.z / 512) : '0'}.mca`}
                            </Cell>
                        </List>
                    }
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
