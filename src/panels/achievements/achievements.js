import React from 'react';
import axios from 'axios';
import VKBridge from "@vkontakte/vk-bridge";
import { Offline, Online } from 'react-detect-offline';

import { Panel, PanelHeaderContent, Input, FormLayout, Button, Group, Div, Separator, PanelHeaderButton, PanelHeaderSimple, Avatar, SelectMimicry, FormLayoutGroup } from "@vkontakte/vkui";
import { OfflineBlock, Spinner, Error, HeaderButtons } from '../components/components';

import {IconSteve} from "../components/icons";
import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';

import "./achievements.css";
/*import "./itemSprites.css";*/
import {randomInteger} from "../../services/_functions";

class AchievementsGet extends React.Component {

    state = {
        one: "",
        two: "",
        lineOne: null,
        lineTwo: null,
        icon: 1,
        url: null,
        storySupport: false
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]/g, "").slice(0, 20)});
    }

    share() {
        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(data => {
                console.log(data);
                if (data.result) {
                    this.setState({ sent: true });

                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "photo",
                            url: this.state.url
                        }
                    });
                }
            })
            .catch(error => {
                this.setState({ lock: false });
                console.log(error)
            });
    }

    openStoryEditor(url) {
        VKBridge.send("VKWebAppShowStoryBox", {
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
            .catch(err => console.log(err) );
    }

    getAchievement() {
        const {one, two, icon} = this.state;

        this.setState({spinner: true, check: false, error: false, url: null, lock: false, sent: false});
        axios.get("https://vkfreeviews.000webhostapp.com/a.php?h=&t=")
            .then(() => {
                const random = randomInteger(1, 530);

                this.setState({
                    spinner: false,
                    check: true,
                    lineOne: one,
                    lineTwo: two,
                    random,
                    url: `https://vkfreeviews.000webhostapp.com/a.php?h=${one}&t=${two}&i=${random}`
                });
            })
            .catch(err => {
                this.setState({ error: "Произошла ошибка. Попробуйте позже.", spinner: false });
                console.log(err);
            });
    }

    selectIcon = (number) => {
        this.setState({icon: number});
    };

    render() {
        const {id, navigator} = this.props;
        const {lineOne, lineTwo, one, two, spinner, error, lock, check, sent, icon, random} = this.state;
        const url = `https://vkfreeviews.000webhostapp.com/a.php?h=${lineOne}&t=${lineTwo}&i=${random}`;

        const {selectIcon} = this;

        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple separator={false}
                                   left={
                                       <PanelHeaderButton onClick={() => navigator.goBack()}>
                                           <HeaderButtons/>
                                       </PanelHeaderButton>
                                   }
                >
                    <PanelHeaderContent status="Генератор достижений"
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
                <Online>
                    <FormLayout>
                        <Input top="Заголовок"
                               name="one"
                               disabled={spinner}
                               value={one}
                               onChange={this.onChange.bind(this)}
                               placeholder="Достижение получено!"
                               maxLength="20"
                        />
                        <FormLayoutGroup top="Текст достижения"
                                         bottom="Поля могут содержать символы латиницы, кириллицы, цифры и спец. символы. (Не больше 20)"
                        >
                            <div style={{display: "flex", alignItems: "center"}}>
                                <div style={{flexGrow: 99}}>
                                    <Input name="two"
                                           disabled={spinner}
                                           value={two}
                                           onChange={this.onChange.bind(this)}
                                           placeholder="Терпение и труд"
                                           maxLength="20"
                                    />
                                </div>
                                {/*<div style={{flexGrow: 1, marginRight: "5px"}}>
                                    <SelectMimicry id="item-selector"
                                                   top="Выбор значка"
                                                   onClick={() => navigator.showModal("select-icon", {selectIcon})}
                                    >
                                        {
                                            <div className={`item-icon item-icon-${icon}`}/>
                                        }
                                    </SelectMimicry>
                                </div>*/}
                            </div>
                        </FormLayoutGroup>
                        <Button disabled={!((one.length > 0 || two.length > 0) && !spinner)}
                                onClick={() => this.getAchievement()}
                                size="xl"
                        >
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
                                <div className="image"
                                     style={{backgroundImage: "url(" + encodeURI(url) + ")"}}
                                />
                                <Separator style={{ margin: "12px 0" }} />
                                <div className="button">
                                    <Button style={{flexGrow: 10}}
                                            stretched
                                            before={sent ? <Icon16Done/> : <Icon24Message width={16} height={16} />}
                                            disabled={lock}
                                            onClick={() => {
                                                this.setState({ lock: true });
                                                this.share()
                                            }}
                                    >
                                        <b>{sent ? "Сообщение отправлено!" : "Получить картинку в сообщения"}</b>
                                    </Button>
                                    <Button disabled={!VKBridge.supports("VKWebAppShowStoryBox")}
                                            onClick={() => this.openStoryEditor(url)}
                                            style={{marginLeft: "10px", weight: "10px", flexGrow: 1}}
                                            stretched
                                    >
                                        <Icon24CameraOutline width={16} height={16}/>
                                    </Button>
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
