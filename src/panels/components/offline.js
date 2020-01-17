import React from 'react';

import {Button, Placeholder} from "@vkontakte/vkui";
import {randomInteger} from "../../services/_functions";
import IconPug from "./icons/pug";
import IconPig from "./icons/pig";
import IconZombie from "./icons/zombie";


class OfflineBlock extends React.Component {

    componentWillMount() {
        this.setState({image: randomInteger(1, 3)})
    }

    render() {
        const icons = [<IconPug/>, <IconPig/>, <IconZombie/>];

        return (
            <Placeholder
                stretched
                title="Упс..."
                icon={icons[this.state.image - 1]}
                action={<Button size="l" stretched target="_blank" href='https://vk.com/stevebotmc'><b>Группа</b></Button>}
            >
                Пропало подключение к серверу!<br /><br />Эта вкладка будет доступна как появится соединение.
            </Placeholder>
        );
    }
}

export default OfflineBlock;
