import React from 'react';
import { Stack, Page } from "vkui-navigator/dist";

import Base from './js/panels/home/base';
import Server from './js/panels/home/server';
import User from './js/panels/home/user';
import Status from './js/panels/home/status';
import Achievements from './js/panels/home/achievements';
import Calculator from './js/panels/home/calculator';
import EnderCalculator from './js/panels/home/endercalculator';

class App extends React.Component {

    state = {
        eruda: false
    };

    eruda = async () => {
        await this.setState({eruda: !this.state.eruda});
        this.state.eruda ? window.eruda.init() : window.eruda.destroy()
    };


    render() {
        return (
            <Stack activePage="main">
                <Page id="main" activePanel="base">
                    <Base id="base" eruda={this.eruda}/>
                    <Server id="server"/>
                    <User id="user"/>
                    <Status id="status"/>
                    <Achievements id="achievements"/>
                    <Calculator id="calculator"/>
                    <EnderCalculator id="endercalculator"/>
                </Page>
            </Stack>
        );
    }
}

export default App;