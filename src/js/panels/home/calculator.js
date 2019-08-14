import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import List from "@vkontakte/vkui/dist/components/List/List";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";


class Calculator extends React.Component {

    state = {
        x: null,
        y: null,
        z: null,
        spinner: null,
        error: null,
        rand: null,
        world: null
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    render() {

        const {x, y, z, world, id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Калькулятор координат">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <FormLayout>
                    <Select name="world" onChange={this.onChange.bind(this)} value={world} top="Мир" placeholder="Выберите мир" bottom='Мир для которого необходимо просчитать координаты'>
                        <option value="world">Обычный</option>
                        <option value="nether">Ад</option>
                    </Select>

                    <Input
                        top='Координата X'
                        bottom='Целое число'
                        type="number"
                        name='x'
                        value={x}
                        onChange={this.onChange.bind(this)}
                        placeholder="220"
                        maxLength='7'
                        pattern='^[-]?[0-9]+$'
                    />
                    <Input
                        top='Координата Y'
                        bottom='Целое число'
                        type="number"
                        name='y'
                        value={y}
                        onChange={this.onChange.bind(this)}
                        placeholder="64"
                        maxLength='3'
                        pattern='^[0-9]+$'
                    />
                    <Input
                        top='Координата Z'
                        bottom='Целое число'
                        type="number"
                        name='z'
                        value={z}
                        onChange={this.onChange.bind(this)}
                        placeholder="-113"
                        maxLength='7'
                        pattern='^[-]?[0-9]+$'
                    />
                    {this.state.world === null ? '' :
                        <List top={this.state.world === 'nether' ? 'Координаты в аду' : 'Координаты в обычном мире'}>
                            <Cell description='Координата X'>
                                {this.state.x === null ? '0' : this.state.world === 'nether' ? Math.floor(this.state.x / 8) : Math.floor(this.state.x * 8)}
                            </Cell>
                            <Cell description='Координата Y'>
                                {this.state.y === null ? '0' : this.state.y.match('^[0-9]+$') ? this.state.y : 0}
                            </Cell>
                            <Cell description='Координата Z'>
                                {this.state.z === null ? '0' : this.state.world === 'nether' ? Math.floor(this.state.z / 8) : Math.floor(this.state.z * 8)}
                            </Cell>
                        </List>
                    }
                    {this.state.world === null ? '' :
                        <List>
                            <Cell description='Номер чанка'>
                                {`${this.state.x === null ? '0' : Math.floor(this.state.x / 16)}, ${this.state.y === null ? '0' : Math.floor(this.state.y / 16)}, ${this.state.z === null ? '0' : Math.floor(this.state.z / 16)}`}
                            </Cell>
                            <Cell description='Файл чанка'>
                                {`r.${this.state.x === null ? '0' : Math.floor(this.state.x / 512)}.${this.state.z === null ? '0' : Math.floor(this.state.z / 512)}.mca`}
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
