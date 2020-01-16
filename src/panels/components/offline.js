import React from 'react';

import {Button, Placeholder} from "@vkontakte/vkui";


class OfflineBlock extends React.Component {
    render() {
        return (
            <Placeholder
                stretched
                title="Упс..."
                action={<Button size="l" stretched target="_blank" href='https://vk.com/stevebotmc'><b>Группа</b></Button>}
            >
                Пропало подключение к серверу!<br /><br />Эта вкладка будет доступна как появится соединение.
            </Placeholder>
        );
    }
}

export default OfflineBlock;
