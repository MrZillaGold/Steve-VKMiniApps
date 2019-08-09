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
                        name='x'
                        value={x}
                        onChange={this.onChange.bind(this)}
                        placeholder="220"
                        maxLength='8'
                        pattern='^[-]?[0-9]+$'
                    />
                    <Input
                        top='Координата Y'
                        name='y'
                        value={y}
                        onChange={this.onChange.bind(this)}
                        placeholder="64"
                        maxLength='3'
                        pattern='^[-]?[0-9]+$'
                    />
                    <Input
                        top='Координата Z'
                        name='z'
                        value={z}
                        onChange={this.onChange.bind(this)}
                        placeholder="-113"
                        maxLength='8'
                        pattern='^[-]?[0-9]+$'
                    />
                    {this.state.world === null ? '' : this.state.world === 'nether' ?
                        <List top='Координаты в аду'>
                            <Cell description='Координата X'>
                                {this.state.x === null ? 'Координата не указана' : this.state.x.match('^[-]?[0-9]+$') ? Math.floor(this.state.x / 8) : 0}
                            </Cell>
                            <Cell description='Координата Y'>
                                {this.state.y === null ? 'Координата не указана' : this.state.y.match('^[-]?[0-9]+$') ? this.state.x : 0}
                            </Cell>
                            <Cell description='Координата Z'>
                                {this.state.z === null ? 'Координата не указана' : this.state.z.match('^[-]?[0-9]+$') ? Math.floor(this.state.x / 8) : 0}
                            </Cell>
                        </List>
                        :
                        <List top='Координаты в обычном мире'>
                            <Cell description='Координата X'>
                                {this.state.x === null ? 'Координата не указана' : this.state.x.match('^[-]?[0-9]+$') ? Math.floor(this.state.x * 8) : 0}
                            </Cell>
                            <Cell description='Координата Y'>
                                {this.state.y === null ? 'Координата не указана' : this.state.y.match('^[-]?[0-9]+$') ? this.state.x : 0}
                            </Cell>
                            <Cell description='Координата Z'>
                                {this.state.z === null ? 'Координата не указана' : this.state.x.match('^[-]?[0-9]+$') ? Math.floor(this.state.x * 8) : 0}
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