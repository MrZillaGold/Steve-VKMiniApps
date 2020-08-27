import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import VKBridge from "@vkontakte/vk-bridge";
import mVKMiniAppsScrollHelper from "@vkontakte/mvk-mini-apps-scroll-helper";

import { platform, IOS } from "@vkontakte/vkui";

import { App } from "./App";

import "@vkontakte/vkui/dist/vkui.css";
import "./panels/scss/styles.scss";

setTimeout(() => VKBridge.send("VKWebAppInit"), 500);

const Os = platform();
const root = document.getElementById("root");

if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);
