import getArgs from "vkappsutils/src/Args";

function timeConvert(time) {
    const currentDate = new Date(time);

    const getDate = currentDate.getDate();
    const getMonth = currentDate.getMonth() + 1;
    const getYear = currentDate.getFullYear();

    const month = getMonth > 9 ? getMonth : `0` + getMonth;
    const date = getDate > 9 ? getDate : `0` + getDate;

    return `${date}.${month}.${getYear}`;
}

function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

const ipRegExp1 = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
const ipRegExp2 = /^([а-яА-ЯёЁa-zA-Z0-9-]+(-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}$/g;
const ipRegExp3 = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)):((?:[123456789])(?:[0-9]{1,4}))$/g;
const ipRegExp4 = /^((?:[а-яА-ЯёЁa-zA-Z0-9-]+(?:-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}):((?:[123456789])(?:[0-9]{1,4}))$/g;

function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

function isIP(ip) {
    return ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4);
}

function getRatio(dividend, divider) {
    return divider && dividend ? (dividend / divider).toFixed(2) : 0;
}

function isMobile() {
    const { platform } = getArgs();

    return platform === "mobile_android" && platform === "mobile_iphone" && platform === "mobile_android_messenger" && platform === "mobile_iphone_messenger";
}

export {
    timeConvert,
    randomInteger,
    declOfNum,
    isIP,
    isMobile,
    getRatio
};
