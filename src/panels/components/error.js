import React from "react";

import { Placeholder } from "@vkontakte/vkui";

import { randomInteger } from "../../services/_functions";

import { IconPug, IconPig, IconZombie } from "./icons";

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
                icon={icons[this.state.image - 1]}
            >
                {error}
            </Placeholder>
        );
    }
}

export default Error;
