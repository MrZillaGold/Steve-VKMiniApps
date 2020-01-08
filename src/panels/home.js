import React from 'react';

import {Panel, Group, Button, PanelHeader, Cell, Avatar, Separator, PanelHeaderContent, ANDROID, platform} from '@vkontakte/vkui';
import "./scss/styles.scss"

import { ReactComponent as IconUser } from './assets/usericon.svg';
import { ReactComponent as IconServer } from './assets/servericon.svg';
import { ReactComponent as IconCalculator } from './assets/calculatoricon.svg';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Message from '@vkontakte/icons/dist/24/message';

import {resizeWindow} from "../services/_functions";

class HomePanelBase extends React.Component {

    activateTestersFeatures() {
        this.props.eruda();
    }

    componentDidMount() {
        resizeWindow(700);
    }

    render() {
        const {id, navigator} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader transparent left={platform() === ANDROID && <img style={{padding: "12px"}} src={require('./assets/steve-icon.png')} alt="Steve"/>}>
                    <PanelHeaderContent status="Minecraft помощник">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Group>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconUser className="icon_base"/></div>} onClick={() => navigator.go('user')} className="pointer">Информация об игроке</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconServer className="icon_base"/></div>} onClick={() => navigator.go('server')} className="pointer">Информация о сервере по IP</Cell>
                    <Separator/>
                    <Cell before={<Icon24Write />} onClick={() => navigator.go('achievements')} className="pointer">Генератор достижений</Cell>
                    <Cell before={<Icon24Message />} onClick={() => navigator.go('chat')} className="pointer">Minecraft чат</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconCalculator className="icon_base"/></div>} onClick={() => navigator.go('calculator')} className="pointer">Калькулятор координат</Cell>
                    <Cell before={<Icon24Search />} onClick={() => navigator.go('endercalculator')} className="pointer">Получение координат крепости</Cell>
                    <Separator/>
                    <Cell before={<Icon24Globe />} onClick={() => navigator.go('status')} className="pointer">Состояние серверов Minecraft</Cell>
                    <Separator/>
                    <Cell
                        multiline
                        before={<Avatar type='image' onDoubleClick={() => this.activateTestersFeatures()} size={64} src={require('./assets/Steve.png')} style={{backgroundColor: 'transparent'}}/>}
                        size="l"
                        description="Получите быстрый доступ ко всем функциям в сообщениях ВК!"
                        bottomContent={
                            <Button onClick={() => window.open("https://vk.com/public175914098", "_blank")} component="a" target="_blank" href="https://vk.com/public175914098"><b>Перейти в группу с ботом</b></Button>
                        }
                    >
                        Steve Бот
                    </Cell>
                </Group>
            </Panel>
        );
    }

}

export default HomePanelBase;