import "core-js/es6/map";
import "core-js/es6/set";

import React from "react";
import ReactDOM from "react-dom";
import VKBridge from "@vkontakte/vk-bridge";

import { platform, IOS } from "@vkontakte/vkui";
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

import { changeStatusBarColor } from "./services/_functions";

import registerServiceWorker from "./sw";

import "@vkontakte/vkui/dist/vkui.css";

import App from './App';

sessionStorage.setItem("scheme", "bright_light");

VKBridge.send("VKWebAppInit");
VKBridge.subscribe(({ detail: { type, data }}) => {
    if (type === "VKWebAppUpdateConfig") {
        const scheme = data.scheme ?
            data.scheme === "client_light" ?
                "bright_light"
                :
                data.scheme === "client_dark" ?
                    "space_gray"
                    :
                    data.scheme
            : "bright_light";

        sessionStorage.setItem("scheme", scheme);
        changeStatusBarColor();
    }
    if (type === "VKWebAppViewRestore") {
        changeStatusBarColor();
    }
});

registerServiceWorker();

const Os = platform();
const root = document.getElementById('root');
if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);
