import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import { Panel, Group, Button, PanelHeader, Cell, CellButton, Avatar, Separator } from '@vkontakte/vkui';

import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Search from '@vkontakte/icons/dist/24/search';

class HomePanelBase extends React.Component {
    render() {
        const {id, setPage, eruda} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Steve</PanelHeader>
                <Group>
                    <CellButton before={<div style={{height: '24px', width: '36px'}}><img src={require('./img/usericon.svg')} alt="Server Info"/></div>} onClick={() => setPage('home', 'user')}>Информация об игроке</CellButton>
                    <CellButton before={<div style={{height: '24px', width: '36px'}}><img src={require('./img/servericon.svg')} alt="Server Info"/></div>} onClick={() => setPage('home', 'server')}>Информация о сервере по IP</CellButton>
                    <Separator />
                    <CellButton before={<Icon24Write />} onClick={() => setPage('home', 'achievements')}>Генератор достижений</CellButton>
                    <CellButton before={<div style={{height: '24px', width: '36px'}}><img src={require('./img/calculatoricon.svg')} alt="Server Info"/></div>} onClick={() => setPage('home', 'calculator')}>Калькулятор координат</CellButton>
                    <CellButton before={<Icon24Search />} onClick={() => setPage('home', 'endercalculator')}>Получение координат крепости</CellButton>
                    <Separator />
                    <CellButton before={<Icon24Globe />} onClick={() => setPage('home', 'status')}>Состояние серверов Minecraft</CellButton>
                </Group>
                <Group>
                    <Cell
                        multiline
                        before={<Avatar type='image' onDoubleClick={eruda} size={64} src={require('./img/Steve.png')} style={{backgroundColor: 'transparent'}}/>}
                        size="l"
                        description="Получите быстрый доступ ко всем функциям в сообщениях ВКонтакте!"
                        bottomContent={
                            <Button component="a" target="_blank" href="https://vk.com/public175914098">Перейти в группу с ботом</Button>
                        }
                    >
                        Steve Бот
                    </Cell>
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
