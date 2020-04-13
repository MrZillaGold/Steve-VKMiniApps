import React from "react";

import { Button, Placeholder } from "@vkontakte/vkui";
import { randomInteger } from "../../services/functions";
import { IconPug, IconPig, IconZombie } from "./icons";


class OfflineBlock extends React.Component {

    state = {
        image: null
    };

    componentDidMount() {
        this.setState({image: randomInteger(1, 3)});
    }

    render() {
        const {image} = this.state;
        const icons = [<IconPug/>, <IconPig/>, <IconZombie/>];

        return (
            image && <Placeholder stretched
                                  title="Упс..."
                                  icon={icons[image - 1]}
                                  action={<Button size="l" stretched target="_blank" href='https://vk.com/stevebotmc'><b>Группа</b></Button>}
            >
                Пропало подключение к серверу!<br /><br />Эта вкладка будет доступна как появится соединение.
            </Placeholder>
        );
    }
}

export default OfflineBlock;
