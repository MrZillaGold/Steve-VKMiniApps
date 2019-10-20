import React from 'react';

import { Panel, Group, Button, PanelHeader, Cell, Avatar, Separator } from '@vkontakte/vkui';
import "./scss/styles.scss"

import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';

class HomePanelBase extends React.Component {

    render() {
        const {id, navigator, eruda} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader transparent>Steve</PanelHeader>
                <Group>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/usericon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => navigator.go('user')} className="pointer">Информация об игроке</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/servericon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => navigator.go('server')} className="pointer">Информация о сервере по IP</Cell>
                    <Separator />
                    <Cell before={<Icon24Write />} onClick={() => navigator.go('achievements')} className="pointer">Генератор достижений</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/calculatoricon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => navigator.go('calculator')} className="pointer">Калькулятор координат</Cell>
                    <Cell before={<Icon24Search />} onClick={() => navigator.go('endercalculator')} className="pointer">Получение координат крепости</Cell>
                    <Separator />
                    <Cell before={<Icon24Globe />} onClick={() => navigator.go('status')} className="pointer">Состояние серверов Minecraft</Cell>
                </Group>
                <Group>
                    <Cell
                        multiline
                        before={<Avatar type='image' onDoubleClick={eruda} size={64} src={require('./img/Steve.png')} style={{backgroundColor: 'transparent'}}/>}
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