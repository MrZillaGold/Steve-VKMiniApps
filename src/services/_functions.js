import VKConnect from "@vkontakte/vk-connect";

export const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    if (c > 30) {
        return;
    }

    if (c > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

export const timeConvert = (time) => {
    const currentDate = new Date(time);

    const getDate = currentDate.getDate();
    const getMonth = currentDate.getMonth() + 1;
    const getYear = currentDate.getFullYear();

    const month = getMonth > 9 ? getMonth : `0` + getMonth;
    const date = getDate > 9 ? getDate : `0` + getDate;
    return date + '.' + month + '.' + getYear;
};

export const fixInput = () => {
    document.querySelector("input").addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            document.querySelector("input").setAttribute("readonly", "readonly");
            setTimeout(function(){document.querySelector("input").removeAttribute("readonly")}, 500);
        }
    });
};

export const randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

export const checkStatus = (status) => {
    const green = require('../panels/assets/green.gif');
    const yellow = require('../panels/assets/yellow.gif');
    const red = require('../panels/assets/red.gif');
    if (status === "green") {
        return {"img" : green, "text" : "Всё в порядке"};
    }
    if (status === "yellow") {
        return {"img" : yellow, "text" : "Небольшие неполадки"};
    }
    if (status === "red") {
        return {"img" : red, "text" : "Проблемы с доступностью"};
    }
};


export const resizeWindow = (height) => {
    VKConnect.send("VKWebAppResizeWindow", {"width": 700, "height": height})
        .catch(() => {});
};

export const ipRegExp1 = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
export const ipRegExp2 = /^([а-яА-ЯёЁa-zA-Z0-9-]+(-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}$/g;
export const ipRegExp3 = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)):((?:[123456789])(?:[0-9]{1,4}))$/g;
export const ipRegExp4 = /^((?:[а-яА-ЯёЁa-zA-Z0-9-]+(?:-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}):((?:[123456789])(?:[0-9]{1,4}))$/g;

export const serverData = (server_ip, server_ver) => {
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
};
