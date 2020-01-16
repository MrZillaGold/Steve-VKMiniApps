import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import VKConnect from "@vkontakte/vk-connect";
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';
import {platform, IOS} from "@vkontakte/vkui/dist/lib/platform";
import '@vkontakte/vkui/dist/vkui.css';
import App from './App';

sessionStorage.setItem('scheme', "bright_light");

VKConnect.send("VKWebAppInit");
VKConnect.subscribe(({ detail: { type, data }}) => {
    if (type === "VKWebAppUpdateConfig") {
        const scheme = data.scheme ? data.scheme : "bright_light";
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

const OsName = platform();
const root = document.getElementById('root');
if (OsName === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);

function changeStatusBarColor() {
    VKConnect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#1c1c1c"});
}
