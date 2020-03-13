import VKBridge from "@vkontakte/vk-bridge";
import {ANDROID, IOS, platform} from "@vkontakte/vkui";

function timeConvert(time) {
    const currentDate = new Date(time);

    const getDate = currentDate.getDate();
    const getMonth = currentDate.getMonth() + 1;
    const getYear = currentDate.getFullYear();

    const month = getMonth > 9 ? getMonth : `0` + getMonth;
    const date = getDate > 9 ? getDate : `0` + getDate;

    return date + '.' + month + '.' + getYear;
}

function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}


function resizeWindow(height) {
    VKBridge.send("VKWebAppResizeWindow", {
        width: 700,
        height: height
    })
        .catch(() => {});
}

const ipRegExp1 = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
const ipRegExp2 = /^([а-яА-ЯёЁa-zA-Z0-9-]+(-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}$/g;
const ipRegExp3 = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)):((?:[123456789])(?:[0-9]{1,4}))$/g;
const ipRegExp4 = /^((?:[а-яА-ЯёЁa-zA-Z0-9-]+(?:-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}):((?:[123456789])(?:[0-9]{1,4}))$/g;

function serverData(server_ip, server_ver) {
    let serverData = {
        ip: null,
        port: null,
        version: server_ver,
    };
    if (server_ip.match(ipRegExp1) || server_ip.match(ipRegExp2)) {
        serverData.ip = server_ip.toLowerCase();
        serverData.port = "25565";
    }
    if (server_ip.match(ipRegExp3)) {
        const ip = ipRegExp3.exec(server_ip);
        serverData.ip = ip[1].toLowerCase();
        serverData.port = ip[2];
    }
    if (server_ip.match(ipRegExp4)) {
        const ip = ipRegExp4.exec(server_ip);
        serverData.ip = ip[1].toLowerCase();
        serverData.port = ip[2];
    }
    return serverData;
}

function changeStatusBarColor() {
    const Os = platform();

    if (Os === IOS || Os === ANDROID) {
        VKBridge.send("VKWebAppSetViewSettings", {
            status_bar_style: "light", action_bar_color: "#1c1c1c"
        });
    }
}

export {timeConvert, randomInteger, resizeWindow, ipRegExp1, ipRegExp2, ipRegExp3, ipRegExp4, serverData, changeStatusBarColor};
