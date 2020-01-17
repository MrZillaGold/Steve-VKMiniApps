import React from 'react';

import {Panel, Group, Button, PanelHeader, Cell, Avatar, Separator, PanelHeaderContent, ANDROID, platform} from '@vkontakte/vkui';
import "./scss/styles.scss"

import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Message from '@vkontakte/icons/dist/24/message';
import IconCalculator from "./components/icons/calculator";
import IconServer from "./components/icons/server";
import IconUser from "./components/icons/user";
import IconSteve from "./components/icons/steve";
import IconHerobrine from "./components/icons/herobrine";

import {resizeWindow} from "../services/_functions";

class HomePanelBase extends React.Component {

    state = {
        testersFeatures: false
    };

    activateTestersFeatures() {
        this.setState({testersFeatures: !this.state.testersFeatures});
        this.props.eruda();
    }

    componentDidMount() {
        resizeWindow(700);
    }

    render() {
        const {id, navigator} = this.props;
        const {testersFeatures} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader transparent left={platform() === ANDROID && <div onDoubleClick={() => this.activateTestersFeatures()} style={{padding: "12px"}}>{!testersFeatures ? <IconSteve/> : <IconHerobrine/>}</div>}>
                    <PanelHeaderContent status="Minecraft помощник">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Group>
                    <Cell before={<IconUser/>} onClick={() => navigator.go('user')} className="pointer">Информация об игроке</Cell>
                    <Cell before={<IconServer/>} onClick={() => navigator.go('server')} className="pointer">Информация о сервере по IP</Cell>
                    <Separator/>
                    <Cell before={<Icon24Write/>} onClick={() => navigator.go('achievements')} className="pointer">Генератор достижений</Cell>
                    <Cell before={<Icon24Message/>} onClick={() => navigator.go('chat')} className="pointer">Minecraft чат</Cell>
                    <Cell before={<IconCalculator/>} onClick={() => navigator.go('calculator')} className="pointer">Калькулятор координат</Cell>
                    <Cell before={<Icon24Search/>} onClick={() => navigator.go('endercalculator')} className="pointer">Получение координат крепости</Cell>
                    <Separator/>
                    <Cell before={<Icon24Globe/>} onClick={() => navigator.go('status')} className="pointer">Состояние серверов Minecraft</Cell>
                    <Separator/>
                    <Cell
                        multiline
                        before={<Avatar type='image' size={64} style={{backgroundColor: 'transparent'}}>{!testersFeatures ? <IconSteve height={64} width={64}/> : <IconHerobrine height={64} width={64}/>}</Avatar>}
                        size="l"
                        description="Получите быстрый доступ ко всем функциям в сообщениях ВК!"
                        bottomContent={
                            <Button target="_blank" href="https://vk.com/public175914098"><b>Перейти в группу с ботом</b></Button>
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
