import React from 'react';
import {randomInteger} from "../../../services/_functions";
import {Placeholder} from "@vkontakte/vkui";

class Error extends React.Component {
    render() {
        const {error, stretch} = this.props;
        const random = randomInteger(1, 3);
        return (
            <Placeholder
                stretched={stretch}
                title="Упс..."
                icon={<img src={require(`../img/error${random}.svg`)} alt="Ошибка" />}
            >
                {error}
            </Placeholder>
        );
    }
}

export default Error;
