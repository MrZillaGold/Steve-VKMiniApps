import React from 'react';
import {randomInteger} from "../../services/_functions";
import {Placeholder} from "@vkontakte/vkui";

class Error extends React.Component {

    state = {
      image: null
    };

    componentWillMount() {
        this.setState({image: randomInteger(1, 3)})
    }

    render() {
        const {error, stretch} = this.props;
        return (
            <Placeholder
                stretched={stretch}
                title="Упс..."
                icon={<img src={require(`../assets/error${this.state.image}.svg`)} alt="Ошибка" />}
            >
                {error}
            </Placeholder>
        );
    }
}

export default Error;
