import React from 'react';

import { Panel, Group, Button, PanelHeader, Cell, Avatar, Separator } from '@vkontakte/vkui';
import "./scss/styles.scss"

import { ReactComponent as IconUser } from './img/usericon.svg';
import { ReactComponent as IconServer } from './img/servericon.svg';
import { ReactComponent as IconCalculator } from './img/calculatoricon.svg';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Message from '@vkontakte/icons/dist/24/message';

class HomePanelBase extends React.Component {

    state = {
        chat: false
    };

    activateTestersFeatures() {
        this.props.eruda();
        this.setState({chat: true})
    }

    render() {
        const {id, navigator} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader transparent>Steve</PanelHeader>
                <Group>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconUser className="icon_base"/></div>} onClick={() => navigator.go('user')} className="pointer">Информация об игроке</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconServer className="icon_base"/></div>} onClick={() => navigator.go('server')} className="pointer">Информация о сервере по IP</Cell>
                    <Separator />
                    <Cell before={<Icon24Write />} onClick={() => navigator.go('achievements')} className="pointer">Генератор достижений</Cell>
                    {
                        this.state.chat ?
                            <Cell before={<Icon24Message />} onClick={() => navigator.go('chat')} className="pointer">Minecraft чат БЕТА</Cell>
                            :
                            undefined
                    }
                    <Cell before={<div style={{height: '24px', width: '40px'}}><IconCalculator className="icon_base"/></div>} onClick={() => navigator.go('calculator')} className="pointer">Калькулятор координат</Cell>
                    <Cell before={<Icon24Search />} onClick={() => navigator.go('endercalculator')} className="pointer">Получение координат крепости</Cell>
                    <Separator />
                    <Cell before={<Icon24Globe />} onClick={() => navigator.go('status')} className="pointer">Состояние серверов Minecraft</Cell>
                </Group>
                <Group>
                    <Cell
                        multiline
                        before={<Avatar type='image' onDoubleClick={() => this.activateTestersFeatures()} size={64} src={require('./img/Steve.png')} style={{backgroundColor: 'transparent'}}/>}
                        size="l"
                        description="Получите быстрый доступ ко всем функциям в сообщениях ВК!"
                        bottomContent={
                            <Button component="a" target="_blank" href="https://vk.com/public175914098"><b>Перейти в группу с ботом</b></Button>
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