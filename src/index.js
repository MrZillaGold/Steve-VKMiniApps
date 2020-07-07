import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import VKBridge from "@vkontakte/vk-bridge";
import mVKMiniAppsScrollHelper from "@vkontakte/mvk-mini-apps-scroll-helper";

import { platform, IOS } from "@vkontakte/vkui";

import { App } from "./App";

import { changeStatusBarColor } from "./bridge";

import "@vkontakte/vkui/dist/vkui.css";
import "./panels/scss/styles.scss";

sessionStorage.setItem("scheme", "bright_light");

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
        const schemeAttribute = document.createAttribute("scheme");

        schemeAttribute.value = scheme;
        document.body.attributes.setNamedItem(schemeAttribute);
        sessionStorage.setItem("scheme", scheme);
        changeStatusBarColor();
    }
    if (type === "VKWebAppViewRestore") {
        changeStatusBarColor();
    }
});
VKBridge.send("VKWebAppInit");

const Os = platform();
const root = document.getElementById('root');
if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);
