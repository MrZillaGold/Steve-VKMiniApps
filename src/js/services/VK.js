import VKConnect from "@vkontakte/vk-connect";

import {setColorScheme} from "../store/vk/actions";

export const initApp = () => (dispatch) => {
    const VKConnectOldCallback = (e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            VKConnect.unsubscribe(VKConnectOldCallback);

            console.log(`Активация цветовой схемы: ${e.detail.data.scheme}`);
            dispatch(setColorScheme(e.detail.data.scheme));
        }
    };

    VKConnect.subscribe(VKConnectOldCallback);
    VKConnect.send('VKWebAppInit', {});
    VKConnect.send("VKWebAppSetViewSettings", {"status_bar_style": "light", "action_bar_color": "#1c1c1c"});
};

export const closeApp = () => {
    VKConnect.send("VKWebAppClose", {"status": "success"});
};

export const swipeBackOn = () => {
    VKConnect.send("VKWebAppEnableSwipeBack", {});
};

export const swipeBackOff = () => {
    VKConnect.send("VKWebAppDisableSwipeBack", {});
};
