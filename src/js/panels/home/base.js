import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import { Panel, Group, Button, PanelHeader, Cell, CellButton, Avatar, Separator } from '@vkontakte/vkui';

import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24NewsFeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Write from '@vkontakte/icons/dist/24/write';
import Icon24Forward10 from '@vkontakte/icons/dist/24/forward_10';

class HomePanelBase extends React.Component {
    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Steve</PanelHeader>
                <Group>
                    <CellButton before={<Icon24Note />} onClick={() => setPage('home', 'user')}>Информация об игроке</CellButton>
                    <CellButton before={<Icon24Info />} onClick={() => setPage('home', 'server')}>Информация о сервере по IP</CellButton>
                    <Separator />
                    <CellButton before={<Icon24NewsFeed />} onClick={() => setPage('home', 'news')}>Новости Minecraft</CellButton>
                    <CellButton before={<Icon24Globe />} onClick={() => setPage('home', 'status')}>Состояние серверов Minecraft</CellButton>
                    <Separator />
                    <CellButton before={<Icon24Write />} onClick={() => setPage('home', 'achievements')}>Генератор достижений</CellButton>
                    <Separator />
                    <CellButton before={<Icon24Forward10 />} onClick={() => setPage('home', 'calculator')}>Калькулятор координат</CellButton>
                </Group>
                <Group>
                    <Cell
                        multiline
                        before={<Avatar type='image' size={64} src={require('./img/Steve.png')} style={{backgroundColor: 'transparent'}}/>}
                        size="l"
                        description="Получите быстрый доступ ко всем функциям в сообщениях ВКонтакте!"
                        bottomContent={
                            <div style={{ display: 'flex' }}>
                                <Button component="a" target="_blank" href="https://vk.com/im?sel=-175914098" stretched>Перейти в диалог с ботом</Button>
                            </div>
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
