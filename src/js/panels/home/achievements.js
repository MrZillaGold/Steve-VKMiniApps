import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import VKConnect from "@vkontakte/vkui-connect-promise";
import VKConnectOld from "@vkontakte/vk-connect";

import { Offline, Online } from 'react-detect-offline';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Input, FormLayout, Button, Spinner, Group, Cell, List, Gallery, Div } from "@vkontakte/vkui";

import Icon24Message from '@vkontakte/icons/dist/24/message';

class AchievementsGet extends React.Component {

    state = {
        one: "",
        two: "",
        lineOne: null,
        lineTwo: null,
        spinner: null,
        error: null,
        value: null,
        rand: null,
        url: null
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]+$/g, "").slice(0, 21)});
    }

    share () {
        console.log("Начинаем отправку сообщения.");
        VKConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098}).then(data => {
            console.log(data);
            if(data.type === "VKWebAppAllowMessagesFromGroupResult") {
                VKConnectOld.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"type":"photo", "url": this.state.url}})
            }

        }).catch(error => console.log(error));
    }

    onClick () {
        this.setState({ spinner: true, check: null, error: null, url: null });

        axios.get(`https://stevecors.herokuapp.com/https://vkfreeviews.000webhostapp.com/a.php?h=&t=`).then(() => {
            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                rand = Math.floor(rand);
                return rand;
            }

            let random = randomInteger(1, 39);

            this.setState({ spinner: null, check: true, lineOne: this.state.one, lineTwo: this.state.two, rand: random, url: 'https://vkfreeviews.000webhostapp.com/a.php?h=' + this.state.one +'&t=' + this.state.two + '&i=' + random });
        }).catch(err => {
            this.setState({ spinner: null });
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
                        { this.state.spinner === null ?
                            <Input
                                top='Заголовок'
                                name='one'
                                value={this.state.one}
                                onChange={this.onChange.bind(this)}
                                status={this.state.value === 'error' ? 'error' : 'default'}
                                placeholder="Достижение получено!"
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , .'
                                maxLength='21'
                            />
                            :
                            <Input
                                top='Заголовок'
                                name='one'
                                placeholder="Достижение получено!"
                                disabled
                                value={this.state.one}
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , .'
                            />
                        }
                        { this.state.spinner === null ?
                            <Input
                                top='Текст достижения'
                                name='two'
                                value={this.state.two}
                                onChange={this.onChange.bind(this)}
                                status={this.state.value === 'error' ? 'error' : 'default'}
                                placeholder="Терпение и труд"
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , .'
                                maxLength='21'
                            />
                            :
                            <Input
                                top='Текст достижения'
                                name='two'
                                placeholder="Терпение и труд"
                                disabled
                                value={this.state.two}
                                bottom='Доступные символы: а-я А-Я ёЁ a-z A-Z 0-9 ! ? , .'
                            />
                        }
                        {
                            (this.state.one.length > 0 || this.state.two.length > 0) && this.state.spinner === null ?
                                <Button onClick={this.onClick.bind(this)} size='xl'>Сгенерировать достижение</Button>
                                :
                                <Button disabled size='xl'>Сгенерировать достижение</Button>
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
                                        style={{ height: 210 }}
                                    >
                                        <div style={{
                                            backgroundImage: 'url(https://github.com/MrZillaGold/steve-vkminiapps/raw/master/src/js/panels/home/img/error.png)',
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
                                            backgroundImage: 'url(' + encodeURI(url) + ')',
                                            backgroundSize: 'contain',
                                            backgroundPosition: '50%',
                                            height: '64px',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        />
                                    </Gallery>
                                    <div style={{ display: 'flex' }}>
                                        <Button onClick={this.share.bind(this)} stretched before={<Icon24Message width={16} height={16} />}>Получить картинку в сообщения</Button>
                                    </div>
                                </Div>
                            </Group>
                        }
                    </FormLayout>
                </Online>
                <Offline>
                    <Div style={{ userSelect: 'none', marginTop: '56px' }}>
                        <Cell align='center'><b>Упс...</b></Cell>
                        <p style={{ whiteSpace: 'pre-wrap', color: '#909499', textAlign: 'center' }}>
                            Пропало подключение с сервером!<br /><br />Эта вкладка будет доступна как появится соединение.
                        </p>
                        <Button level='tertiary' stretched component='a' href='https://vk.com/stevebotmc'>Группа</Button>
                        <Gallery style={{ height: 210 }}>
                            <div style={{
                                backgroundImage: 'url(https://github.com/MrZillaGold/steve-vkminiapps/raw/master/src/js/panels/home/img/error.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: '50%',
                                backgroundRepeat: 'no-repeat'}}
                            />
                        </Gallery>
                    </Div>
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
