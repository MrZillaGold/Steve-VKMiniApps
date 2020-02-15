import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import VKConnect from "@vkontakte/vk-connect";
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';
import {platform, IOS, ANDROID} from "@vkontakte/vkui/dist/lib/platform";
import '@vkontakte/vkui/dist/vkui.css';
import App from './App';

sessionStorage.setItem('scheme', "bright_light");

VKConnect.send("VKWebAppInit");
VKConnect.subscribe(({ detail: { type, data }}) => {
    if (type === "VKWebAppUpdateConfig") {
        const scheme = data.scheme ? data.scheme === "client_light" ? "bright_light" : data.scheme === "client_dark" ? "space_gray" :  data.scheme : "bright_light";
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = scheme;
        document.body.attributes.setNamedItem(schemeAttribute);
        sessionStorage.setItem('scheme', scheme);
    }
    if (type === "VKWebAppViewRestore") {
        changeStatusBarColor();
    }
});

changeStatusBarColor();

const Os = platform();
const root = document.getElementById('root');
if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);

function changeStatusBarColor() {
    if (Os === IOS || Os === ANDROID) {
        VKConnect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#1c1c1c"});
    }
}
