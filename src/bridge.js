import VKBridge from "@vkontakte/vk-bridge";

import { isMobile } from "./functions";

function changeStatusBarColor() {
    if (isMobile()) {
        VKBridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "light", action_bar_color: "#1c1c1c"
        });
    }
}

export {
    changeStatusBarColor
}
