import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';
import VKConnect from "@vkontakte/vkui-connect-promise";

import { Offline, Online } from 'react-detect-offline';

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
        this.setState({[name]: value});
    }

    share () {
        VKConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098}).then(data => {

                if(data.type === "VKWebAppAllowMessagesFromGroupResult") {
                    VKConnect.send("VKWebAppSendPayload", {"group_id": 175914098, "payload": {"url": this.state.url}})
                }

            }).catch(error => console.log(error));
    }

    onClick () {
        this.setState({ spinner: true, check: null, error: null, url: null });
        
        axios.get(`https://cors-anywhere.herokuapp.com/https://vkfreeviews.000webhostapp.com/a.php?h=&t=`).then(() => {
            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                rand = Math.floor(rand);
                return rand;
            }
            
            let random = randomInteger(1, 39);
            
            this.setState({ spinner: null, check: true, lineOne: this.state.one, lineTwo: this.state.two, rand: random, url: 'http://image.mrzillagold.me/a.php?h=' + this.state.lineOne +'&t=' + this.state.lineTwo + '&i=' + random });
        }).catch(err => {
            this.setState({ spinner: null });
            if (err) {
                this.setState({ error: `Произошла ошибка. Попробуйте позже.` });
            }
        });
    }

    render() {

        const {one, two, id, goBack} = this.props;
        const url = 'http://image.mrzillagold.me/a.php?h=' + this.state.lineOne +'&t=' + this.state.lineTwo + '&i=' + this.state.rand;

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Генератор достижений">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
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
                                        <Button onClick={this.share.bind(this)} stretched before={<Icon24Message width={16} height={16} />}>Получить картинку в сообщения</Button>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <Button component="a" download="achievement.png" href={url + '&d=1'} stretched before={<Icon16Down/>}>Скачать</Button>
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
                        <Gallery style={{ height: 200 }}>
                            <div style={{
                                backgroundImage: 'url(https://psv4.userapi.com/c848424/u233731786/docs/d8/5b1e5e8f3fa5/Enderman.png)',
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
