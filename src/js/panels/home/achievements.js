import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import PanelHeaderContent from "@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import Icon16Down from '@vkontakte/icons/dist/16/down';


class AchievementsGet extends React.Component {

    state = {
        one: "",
        two: "",
        lineone: null,
        linetwo: null,
        spinner: null,
        error: null,
        value: null,
        rand: null
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }



    onClick () {
        this.setState({ spinner: true, check: null, error: null });
        axios.get(`https://vkfreeviews.000webhostapp.com/a.php?h=${this.state.one}&t=${this.state.two}`).then(() => {
            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                rand = Math.floor(rand);
                return rand;
            }
            this.setState({ spinner: null, check: true, lineone: this.state.one, linetwo: this.state.two, rand: randomInteger(1, 39) });
        }).catch(err => {
            this.setState({ spinner: null });
            if (err.response.status > 0 && err.response.status !== 200) {
                this.setState({ error: `Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?` });
                return console.log(`Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?`);
            }
        });
    }

    render() {

        const {one, two, id, goBack} = this.props;
        const url = 'https://vkfreeviews.000webhostapp.com/a.php?h=' + this.state.lineone +'&t=' + this.state.linetwo + '&i=' + this.state.rand;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Генератор достижений">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <FormLayout>
                    <Input
                        top='Первая строка'
                        name='one'
                        value={one}
                        onChange={this.onChange.bind(this)}
                        status={this.state.value === 'error' ? 'error' : 'default'}
                        placeholder="Достижение получено!"
                        maxLength='21'
                    />
                    <Input
                        top='Вторая строка'
                        name='two'
                        value={two}
                        onChange={this.onChange.bind(this)}
                        status={this.state.value === 'error' ? 'error' : 'default'}
                        placeholder="Терпение и труд"
                        maxLength='21'
                    />
                    {
                        this.state.one.length > 0 || this.state.two.length > 0 ?
                            <Button onClick={this.onClick.bind(this)} size='xl'>Сгенерировать достижение</Button>
                            :
                            <Button disabled onClick={this.onClick.bind(this)} size='xl'>Сгенерировать достижение</Button>
                    }

                    { this.state.spinner === null ?
                        '' :
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Spinner size='large' style={{ marginTop: 20 }} />
                        </div>
                    }
                    {
                        this.state.error === null ?
                            '' :
                            <Group>
                                <List>
                                    <Cell align='center'><b>Упс...</b></Cell>
                                </List>
                                <p style={{ whiteSpace: 'pre-wrap', color: '#909499', textAlign: 'center' }}>{this.state.error}</p>
                                <Gallery
                                    style={{ height: 200 }}
                                >
                                    <div style={{
                                        backgroundImage: 'url(https://www.minecraft.net/content/dam/archive/0ef629a3446f9a977087c578189097dd-sticker_creeper.png)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: '50%',
                                        height: '200px',
                                        width: '100%',
                                        backgroundRepeat: 'no-repeat'}}
                                    />
                                </Gallery>
                            </Group>
                    }
                    {this.state.check == null ? '' :
                        <Group>
                            <Div>
                                <Gallery
                                    style={{
                                        height: '70px'
                                    }}
                                >
                                    <div style={{
                                        backgroundImage: 'url(' + url +')',
                                        backgroundSize: 'contain',
                                        backgroundPosition: '50%',
                                        height: '64px',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    />
                                </Gallery>
                                <div style={{ display: 'flex' }}>
                                    <Button component="a" download="achievement.png" href={`${url}&d=1`} stretched before={<Icon16Down/>}>Скачать</Button>
                                </div>
                            </Div>
                        </Group>
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

export default connect(null, mapDispatchToProps)(AchievementsGet);
