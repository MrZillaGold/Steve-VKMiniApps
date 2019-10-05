import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import {fixInput} from "../../services/_functions";
import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Input, FormLayout, Button, Group, Cell, List, Div, Separator } from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import VKConnect from "@vkontakte/vk-connect";

import {randomInteger} from "../../services/_functions";

import { Offline, Online } from 'react-detect-offline';
import OfflineBlock from './offline';
import "./spinner.css";
import "./achievements.css";

class AchievementsGet extends React.Component {

    state = {
        one: "",
        two: "",
        lineOne: null,
        lineTwo: null,
        rand: null,
        url: null,
    };

    onChange(e) {
        fixInput();
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]/g, "").slice(0, 20)});
    }

    share () {
        console.log("Начинаем отправку сообщения.");
        VKConnect.sendPromise("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098})
            .then(data => {
                console.log(data);
                if(data.result) {
                    this.setState({ lock: true });
                    VKConnect.send("VKWebAppSendPayload",
                        {"group_id": 175914098, "payload": {"type":"photo", "url": this.state.url}}
                    );
                }
            })
            .catch(error => console.log(error));
    }

    onClick () {

        this.setState({
            spinner: true,
            check: false,
            error: false,
            url: null,
            lock: false
        });

        axios.get(`https://stevecors.herokuapp.com/https://vkfreeviews.000webhostapp.com/a.php?h=&t=`)
            .then(() => {
                const random = randomInteger(1, 39);
                this.setState({
                    spinner: false,
                    check: true,
                    lineOne: this.state.one,
                    lineTwo: this.state.two,
                    rand: random,
                    url: 'https://vkfreeviews.000webhostapp.com/a.php?h=' + this.state.one +'&t=' + this.state.two + '&i=' + random
                });
            })
            .catch(err => {
                this.setState({ spinner: false });
                if (err) {
                    this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
                    console.log(err);
                }
            });
    }

    render() {

        const {id, goBack} = this.props;
        const url = 'https://vkfreeviews.000webhostapp.com/a.php?h=' + this.state.lineOne +'&t=' + this.state.lineTwo + '&i=' + this.state.rand;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Генератор">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        { this.state.spinner ?
                            <Input
                                top='Заголовок'
                                name='one'
                                placeholder="Достижение получено!"
                                disabled
                                value={this.state.one}
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , . (Не больше 20 символов)'
                            />
                            :
                            <Input
                                top='Заголовок'
                                name='one'
                                value={this.state.one}
                                onChange={this.onChange.bind(this)}
                                placeholder="Достижение получено!"
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , . (Не больше 20 символов)'
                                maxLength='20'
                            />
                        }
                        { this.state.spinner ?
                            <Input
                                top='Текст достижения'
                                name='two'
                                placeholder="Терпение и труд"
                                disabled
                                value={this.state.two}
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , . (Не больше 20 символов)'
                            />
                            :
                            <Input
                                top='Текст достижения'
                                name='two'
                                value={this.state.two}
                                onChange={this.onChange.bind(this)}
                                placeholder="Терпение и труд"
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , . (Не больше 20 символов)'
                                maxLength='20'
                            />
                        }
                        {
                            (this.state.one.length > 0 || this.state.two.length > 0) && !this.state.spinner ?
                                <Button onClick={this.onClick.bind(this)} size='xl'>Сгенерировать достижение</Button>
                                :
                                <Button disabled size='xl'>Сгенерировать достижение</Button>
                        }

                        { this.state.spinner ?
                            <div className="spinner">
                                <img src={require('./img/loading.svg')} alt="Загрузка..." className="loading" />
                            </div>
                            :
                            ""
                        }
                        {
                            this.state.error ?
                                <Group>
                                    <List>
                                        <Cell align='center'><b>Упс...</b></Cell>
                                    </List>
                                    <p className="error_text">{this.state.error}</p>
                                    <div className="error_image"/>
                                </Group>
                                :
                                ""
                        }
                        {
                            this.state.check ?
                                <Group>
                                    <Div>
                                        <img src={encodeURI(url)} className="image" alt="achievement"/>
                                        <Separator style={{ margin: '12px 0' }} />
                                        <div className="button">
                                            { this.state.lock ?
                                                <Button disabled stretched before={<Icon16Done width={16} height={16} />}>Сообщение отправлено!</Button>
                                                :
                                                <Button onClick={this.share.bind(this)} stretched before={<Icon24Message width={16} height={16} />}>Получить картинку в сообщения</Button>
                                            }
                                        </div>
                                    </Div>
                                </Group>
                                :
                                ""
                        }
                    </FormLayout>
                </Online>
                <Offline>
                    <OfflineBlock />
                </Offline>
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
