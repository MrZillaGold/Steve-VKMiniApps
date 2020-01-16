import React from 'react';
import axios from 'axios';
import VKConnect from "@vkontakte/vk-connect";
import { Offline, Online } from 'react-detect-offline';
import {Panel, PanelHeader, PanelHeaderContent, Input, FormLayout, Button, Group, Div, Separator, HeaderButton} from "@vkontakte/vkui";

import {randomInteger, fixInput} from "../services/_functions";

import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';

import OfflineBlock from './components/offline';
import Spinner from './components/spinner';
import Error from './components/error';
import HeaderButtons from "./components/headerbuttons";
import "./achievements.css";

class AchievementsGet extends React.Component {

    state = {
        one: "",
        two: "",
        lineOne: null,
        lineTwo: null,
        rand: null,
        url: null,
        storySupport: false
    };

    onChange(e) {
        fixInput();
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]/g, "").slice(0, 20)});
    }

    share() {
        console.log("Начинаем отправку сообщения.");
        VKConnect.sendPromise("VKWebAppAllowMessagesFromGroup", {"group_id": 175914098})
            .then(data => {
                console.log(data);
                if (data.result) {
                    this.setState({ lock: true });
                    VKConnect.send("VKWebAppSendPayload",
                        {"group_id": 175914098, "payload": {"type":"photo", "url": this.state.url}}
                    );
                }
            })
            .catch(error => console.log(error));
    }

    openStoryEditor(url) {
        console.log(`URL Достижения: ${url}`);
        VKConnect.sendPromise("VKWebAppShowStoryBox", {
            background_type: "none",
            stickers: [{
                sticker_type: "renderable",
                sticker: {
                    content_type: "image",
                    url: url,
                    transform: {
                        relation_width: 0.8
                    }
                }
            }],
            attachment: {
                text: "open",
                type: "url",
                url: "https://vk.com/minetools#achievements"
            }
        })
            .then(r => console.log(r))
            .catch(err => console.log(err))
    }

    onClick () {
        this.setState({
            spinner: true,
            check: false,
            error: false,
            url: null,
            lock: false
        });
        axios.get(`https://vkfreeviews.000webhostapp.com/a.php?h=&t=`)
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
        const {id, navigator} = this.props;
        const {lineOne, lineTwo, rand, one, two, spinner, error, lock, check} = this.state;
        const url = 'https://vkfreeviews.000webhostapp.com/a.php?h=' + lineOne +'&t=' + lineTwo + '&i=' + rand;

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Генератор">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                    <FormLayout>
                        <Input
                            top='Заголовок'
                            name='one'
                            disabled={spinner}
                            value={one}
                            onChange={this.onChange.bind(this)}
                            placeholder="Достижение получено!"
                            maxLength='20'
                        />
                        <Input
                            top='Текст достижения'
                            name='two'
                            disabled={spinner}
                            value={two}
                            onChange={this.onChange.bind(this)}
                            placeholder="Терпение и труд"
                            bottom='Может содержать символы латиницы, кириллицы и спец. символы. (Не больше 20)'
                            maxLength='20'
                        />
                        <Button disabled={!((one.length > 0 || two.length > 0) && !spinner)} onClick={this.onClick.bind(this)} size='xl'>
                            <b>Сгенерировать достижение</b>
                        </Button>
                    </FormLayout>
                    {
                        spinner && <Spinner/>
                    }
                    {
                        error && <Error error={error}/>
                    }
                    {
                        check &&
                            <Group>
                                <Separator/>
                                <Div>
                                    <div className="image" style={{backgroundImage: 'url(' + encodeURI(url) + ')'}}/>
                                    <Separator style={{ margin: '12px 0' }} />
                                    <div className="button">
                                        <Button disabled={lock} onClick={this.share.bind(this)} style={{flexGrow: 10}} stretched before={lock ? <Icon16Done/> : <Icon24Message width={16} height={16} />}><b>{lock ? "Сообщение отправлено!" : "Получить картинку в сообщения"}</b></Button>
                                        <Button disabled={!VKConnect.supports("VKWebAppShowStoryBox")} onClick={() => this.openStoryEditor(url)} style={{marginLeft: "10px", weight: "10px", flexGrow: 1}} stretched><Icon24CameraOutline width={16} height={16}/></Button>
                                    </div>
                                </Div>
                            </Group>
                    }
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }

}

export default AchievementsGet;
