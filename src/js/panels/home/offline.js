import React from 'react';

import { Button, Cell } from "@vkontakte/vkui";


class OfflineBlock extends React.Component {
    render() {
        return (
            <div style={{padding: '50px 0', height: '100%', alignItems: 'center', justifyContent: 'center', whiteSpace: 'pre-wrap'}}>
                <div style={{flex: '0 0 auto', textAlign: 'center'}}>
                    <Cell><b>Упс...</b></Cell>
                    <p style={{color: '#909499'}}>
                        Пропало подключение с сервером!<br /><br />Эта вкладка будет доступна как появится соединение.
                    </p>
                    <Button level='tertiary' stretched component='a' href='https://vk.com/stevebotmc'>Группа</Button>
                    <img src="https://www.minecraft.net/content/dam/archive/77427789b44938b5eda7705fd3095d32-sticker_pig3.png"
                         style={{
                             backgroundSize: 'contain',
                             height: 177.5,
                             backgroundPosition: '50%',
                             backgroundRepeat: 'no-repeat'
                         }}
                         alt=""
                    />
                </div>
            </div>
        );
    }
}

export default OfflineBlock;