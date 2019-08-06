import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {goBack, closeModal} from "./js/store/router/actions";
import * as VK from './js/services/VK';

import View from '@vkontakte/vkui/dist/components/View/View';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ConfigProvider from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider';

import HomePanelProfile from './js/panels/home/base';
import HomePanelServer from './js/panels/home/server';
import HomePanelNameHistory from './js/panels/home/namehistory';
import HomePanelSkin from './js/panels/home/skin';
import HomePanelNews from './js/panels/home/news';
import HomePanelStatus from './js/panels/home/status';

class App extends React.Component {
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
        const {goBack, popouts, activeView, activePanel, panelsHistory, colorScheme} = this.props;

        let history = (panelsHistory[activeView] === undefined) ? [activeView] : panelsHistory[activeView];
        let popout = (popouts[activeView] === undefined) ? null : popouts[activeView];

        return (
            <ConfigProvider isWebView={true} scheme={colorScheme}>
                <Root activeView={activeView} popout={popout}>
                    <View
                        id="home"
                        activePanel={activePanel}
                        history={history}
                        onSwipeBack={() => goBack()}
                    >
                        <HomePanelProfile id="base" />
                        <HomePanelServer id="server"/>
                        <HomePanelNameHistory id="namehistory"/>
                        <HomePanelSkin id="skin"/>
                        <HomePanelNews id="news"/>
                        <HomePanelStatus id="status"/>
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