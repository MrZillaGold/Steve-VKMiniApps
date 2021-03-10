import React from "react";
import ReactDOM from "react-dom";
import VKBridge from "@vkontakte/vk-bridge";
import { platform, IOS } from "@vkontakte/vkui";
import mVKMiniAppsScrollHelper from "@vkontakte/mvk-mini-apps-scroll-helper";

import { AppearanceProvider } from "./components";
import { App } from "./App";

import "core-js";
import "@vkontakte/vkui/dist/vkui.css";
import "./App.css";

setTimeout(() => VKBridge.send("VKWebAppInit"), 500);

const Os = platform();
const root = document.getElementById("root");

if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(
    <AppearanceProvider>
        <App/>
    </AppearanceProvider>,
    root
);
