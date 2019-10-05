import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal} from "./js/store/router/actions";
import * as VK from './js/services/VK';

import View from '@vkontakte/vkui/dist/components/View/View';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ConfigProvider from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider';

import Profile from './js/panels/home/base';
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

    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    componentWillMount() {
        const {goBack, dispatch} = this.props;

        dispatch(VK.initApp());

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack('Android');
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeView, activeStory, activePanel, scrollPosition} = this.props;

        if (
            prevProps.activeView !== activeView ||
            prevProps.activePanel !== activePanel ||
            prevProps.activeStory !== activeStory
        ) {
            let pageScrollPosition = scrollPosition[activeStory + "_" + activeView + "_" + activePanel] || 0;

            window.scroll(0, pageScrollPosition);
        }
    }

    render() {
        const {goBack, activeView, activePanel, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                    <Root activeView={activeView}>
                        <View id="home" activePanel={activePanel} history={history} onSwipeBack={() => goBack()}>
                            <Profile id="base" eruda={this.eruda} />
                            <Server id="server"/>
                            <User id="user"/>
                            <Status id="status"/>
                            <Achievements id="achievements"/>
                            <Calculator id="calculator"/>
                            <EnderCalculator id="endercalculator"/>
                        </View>
                    </Root>
            </ConfigProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeView: state.router.activeView,
        activePanel: state.router.activePanel,
        activeStory: state.router.activeStory,
        panelsHistory: state.router.panelsHistory,
        activeModals: state.router.activeModals,
        popouts: state.router.popouts,
        scrollPosition: state.router.scrollPosition,

        colorScheme: state.vkui.colorScheme
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, closeModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
