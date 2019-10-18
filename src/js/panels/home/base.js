import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import { Panel, Group, Button, PanelHeader, Cell, Avatar, Separator } from '@vkontakte/vkui';
import "./scss/styles.scss"

import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';

class HomePanelBase extends React.Component {

    render() {
        const {id, setPage, eruda} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader transparent>Steve</PanelHeader>
                <Group>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/usericon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => setPage('home', 'user')} className="pointer">Информация об игроке</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/servericon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => setPage('home', 'server')} className="pointer">Информация о сервере по IP</Cell>
                    <Separator />
                    <Cell before={<Icon24Write />} onClick={() => setPage('home', 'achievements')} className="pointer">Генератор достижений</Cell>
                    <Cell before={<div style={{height: '24px', width: '40px'}}><img src={require('./img/calculatoricon.svg')} className="icon_base" alt="Server Info"/></div>} onClick={() => setPage('home', 'calculator')} className="pointer">Калькулятор координат</Cell>
                    <Cell before={<Icon24Search />} onClick={() => setPage('home', 'endercalculator')} className="pointer">Получение координат крепости</Cell>
                    <Separator />
                    <Cell before={<Icon24Globe />} onClick={() => setPage('home', 'status')} className="pointer">Состояние серверов Minecraft</Cell>
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

const mapDispatchToProps = {setPage, goBack, openPopout, closePopout, openModal};

export default connect(null, mapDispatchToProps)(HomePanelBase);