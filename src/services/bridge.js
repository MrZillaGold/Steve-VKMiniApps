import VKBridge from "@vkontakte/vk-bridge";
import { ANDROID, IOS, platform } from "@vkontakte/vkui";

function resizeWindow(height) {
    VKBridge.send("VKWebAppResizeWindow", {
        width: 700,
        height: height
    })
        .catch(() => {});
}

function changeStatusBarColor() {
    const Os = platform();

    if (Os === IOS || Os === ANDROID) {
        VKBridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "light", action_bar_color: "#1c1c1c"
        });
    }
}

export {
    resizeWindow,
    changeStatusBarColor
};