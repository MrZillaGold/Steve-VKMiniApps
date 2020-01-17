import React from 'react';
import {randomInteger} from "../../services/_functions";
import {Placeholder} from "@vkontakte/vkui";
import IconPug from "./icons/pug";
import IconPig from "./icons/pig";
import IconZombie from "./icons/zombie";

class Error extends React.Component {

    state = {
      image: null
    };

    componentWillMount() {
        this.setState({image: randomInteger(1, 3)})
    }

    render() {
        const {error, stretch} = this.props;
        const icons = [<IconPug/>, <IconPig/>, <IconZombie/>];
        return (
            <Placeholder
                stretched={stretch}
                title="Упс..."
                icon={icons[this.state.image - 1]}
            >
                {error}
            </Placeholder>
        );
    }
}

export default Error;
