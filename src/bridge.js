import VKBridge from "@vkontakte/vk-bridge";
import getArgs from "vkappsutils/src/Args";

function changeStatusBarColor() {
    const { platform } = getArgs();

    if (platform !== "desktop_web" && platform !== "mobile_web") {
        VKBridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "light", action_bar_color: "#1c1c1c"
        });
    }
}

export {
    changeStatusBarColor
}
