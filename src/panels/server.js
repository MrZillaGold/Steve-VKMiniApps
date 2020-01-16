import React from 'react';
import axios from 'axios';
import VKConnect from "@vkontakte/vk-connect";
import { Offline, Online } from 'react-detect-offline';
import {Panel, PanelHeader, PanelHeaderContent, Input, FormLayout, Button, Avatar, Group, Cell, Header, List, HeaderButton, FormLayoutGroup, Separator} from "@vkontakte/vkui";
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import {fixInput, resizeWindow, ipRegExp1, ipRegExp2, ipRegExp3, ipRegExp4} from "../services/_functions";

import OfflineBlock from './components/offline';
import Spinner from './components/spinner';
import Error from './components/error';
import HeaderButtons from "./components/headerbuttons";

class ServerInfo extends React.Component {

    state = {
        ip: '',
        titleIP: null,
        favoriteList: []
    };

    onChange(e) {
        fixInput();
        const {name, value} = e.currentTarget;
        this.setState({[name]: value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.:-]/g, "").slice(0, 100)});
    }

    onClick() {
        this.setState({spinner: true, error: false, response: false, openFavorite: false});
        axios.get(`https://stevecors.herokuapp.com/https://api.mcsrvstat.us/2/${this.state.ip}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data.online) {
                    this.setState({response: data, spinner: false, titleIP: this.state.ip.toLowerCase()});
                } else {
                    this.setState({error: `Сервер ${this.state.ip} оффлайн, либо информация отсутствует.`, spinner: false});
                }
            })
            .catch(err => {
                this.setState({ error: `Произошла ошибка. Попробуйте позже.`, spinner: false });
                console.log(err);
            });
    }

    componentDidMount() {
        resizeWindow(1500);
        VKConnect.sendPromise("VKWebAppStorageGet", {"keys": ["steveFavoriteList"]})
            .then(res => {
                console.log(res);
                console.log(`Избранные сервера: ${res.keys[0].value}`);
                if (res.keys[0].value.length > 1) {
                    this.setState({favoriteList: res.keys[0].value.split(',')});
                }
            });
    }

    async addFavorite(ip) {
        console.log("Добавляем сервер в избранное.");
        const favoriteList = [...this.state.favoriteList];
        favoriteList.unshift(ip.toLowerCase());
        await this.setState({favoriteList});
        await VKConnect.send("VKWebAppStorageSet", {"key": "steveFavoriteList", "value": this.state.favoriteList.join(",")});
    }

    saveFavorite() {
        console.log("Сохраняем избранное.");
        VKConnect.send("VKWebAppStorageSet", {"key": "steveFavoriteList", "value": this.state.favoriteList.join(",")});
    }

    render() {
        const {id, navigator} = this.props;
        const {spinner, error, response, titleIP, editFavorite, openFavorite, ip, favoriteList} = this.state;
        const defaultImage = 'data:image/png;base64,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';

        return (
            <Panel id={id}>
                <PanelHeader transparent left={<HeaderButton onClick={() => navigator.goBack()}><HeaderButtons/></HeaderButton>}>
                    <PanelHeaderContent status="Информация по IP">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online onChange={() => this.componentDidMount()}>
                    <FormLayout>
                        <FormLayoutGroup top="IP-Адрес сервера" bottom="Например: Hypixel.net">
                            <div style={{display: "flex", alignItems: "center"}} className="Input">
                                <div style={{flexGrow: 99}}>
                                    <Input
                                        disabled={spinner || editFavorite}
                                        name='ip'
                                        value={ip}
                                        onChange={this.onChange.bind(this)}
                                        status={ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4) || ip === "" ? 'default' : 'error'}
                                        bottom={ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4) || ip === "" ? 'Например: Hypixel.net' : 'Неправильный IP-Адрес.'}
                                        placeholder="Введите IP-Адрес"
                                        maxLength='100'
                                    />
                                </div>
                                <div style={{flexGrow: 1, marginRight: "5px"}}>
                                    {
                                        openFavorite ?
                                            <Icon24Dropdown style={editFavorite ? {opacity: ".2"} : ""} onClick={() => !editFavorite ? this.setState({openFavorite: false}) : undefined} width={35} height={35}/>
                                            :
                                            <Icon24Chevron style={spinner || favoriteList.length < 1 ? {opacity: ".2"} : ""} onClick={() => spinner || favoriteList.length < 1 ? undefined : this.setState({openFavorite: true, editFavorite: false})} width={35} height={35}/>
                                    }
                                </div>
                            </div>
                            {
                                openFavorite ?
                                    favoriteList.length > 0 || editFavorite ?
                                        <Group style={{marginTop: "20px"}}>
                                            <Separator/>
                                            <Header mode="secondary" aside={editFavorite ?
                                                <div style={{display: "flex"}}>
                                                    <Icon24Cancel onClick={() => this.setState({favoriteList: this.state.backup, editFavorite: false})} style={{marginRight: "5px"}}/>
                                                    <Icon24DoneOutline onClick={() => {
                                                        this.setState({editFavorite: false, openFavorite: !favoriteList.length <= 0});
                                                        this.saveFavorite();
                                                    }}/>
                                                </div>
                                                :
                                                <Icon24Write onClick={() => this.setState({editFavorite: true, backup: favoriteList})}/>}
                                            >
                                                Избранные сервера
                                            </Header>
                                            <List>
                                                {
                                                    editFavorite ?
                                                        favoriteList.map((item, index) => (
                                                            <Cell key={item} draggable
                                                                  removable
                                                                  onDragFinish={({from, to}) => {
                                                                      const favoriteList = [...this.state.favoriteList];
                                                                      favoriteList.splice(from, 1);
                                                                      favoriteList.splice(to, 0, this.state.favoriteList[from]);
                                                                      this.setState({favoriteList});
                                                                  }}
                                                                  onRemove={() => {
                                                                      this.setState({favoriteList: [...favoriteList.slice(0, index), ...favoriteList.slice(index + 1)]});
                                                                  }}
                                                            >{item}</Cell>
                                                        ))
                                                        :
                                                        favoriteList.map((item) => (
                                                            <Cell key={item} onClick={async () => {
                                                                await this.setState({ip: item, openFavorite: false});
                                                                await this.onClick();
                                                            }}>{item}</Cell>
                                                        ))
                                                }
                                            </List>
                                            <Separator/>
                                        </Group>
                                        :
                                        undefined
                                    :
                                    undefined
                            }
                        </FormLayoutGroup>
                        <Button onClick={this.onClick.bind(this)} size='xl' disabled={!(ip.length > 2 && !editFavorite && !spinner && (ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4)))}>
                            <b>Получить информацию</b>
                        </Button>
                        {
                            spinner && <Spinner/>
                        }
                        {
                            response &&
                                <Group description={response.software && `Ядро сервера: ${response.software}`}>
                                    <Separator/>
                                    <Header mode="secondary" aside={favoriteList.includes(titleIP.toLowerCase()) ? <Icon24DoneOutline style={{opacity: ".2"}}/> : <Icon24FavoriteOutline onClick={() => this.addFavorite(titleIP)}/>}>
                                        {titleIP}
                                    </Header>
                                    <List>
                                        <Cell
                                            multiline
                                            before={<Avatar style={{imageRendering: "pixelated"}} type="image" size={64} src={response.icon ? response.icon.toString().replace(/\//g, '/') : defaultImage}/>}
                                            description={`Игроков: ${response.players.online} / ${response.players.max}`}
                                        >
                                            <span className='Container' dangerouslySetInnerHTML={{__html: response.motd.html[0]}} />
                                            <span className='Container' dangerouslySetInnerHTML={{__html: response.motd.html[1]}} />
                                        </Cell>
                                        {
                                            response.players.list &&
                                                <Cell multiline style={{whiteSpace: 'pre-wrap'}}>
                                                    {response.players.list.toString().replace(/,/g, ',  ')}
                                                </Cell>
                                        }
                                    </List>
                                </Group>
                        }
                        {
                            error && <Error error={error}/>
                        }
                    </FormLayout>
                </Online>
                <Offline>
                    <OfflineBlock/>
                </Offline>
            </Panel>
        );
    }

}

export default ServerInfo;
