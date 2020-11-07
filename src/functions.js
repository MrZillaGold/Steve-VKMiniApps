export function timeConvert(time) {
    const pad = (number) => {
        return number > 9 ? number : `0${number}`;
    };

    const currentDate = new Date(time);

    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${pad(date)}.${pad(month)}.${year}`;
}

export function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

const ipRegExp1 = /^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
const ipRegExp2 = /^([а-яА-ЯёЁa-zA-Z0-9-]+(-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}$/g;
const ipRegExp3 = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)):((?:[123456789])(?:[0-9]{1,4}))$/g;
const ipRegExp4 = /^((?:[а-яА-ЯёЁa-zA-Z0-9-]+(?:-[а-яА-ЯёЁa-zA-Z0-9-]+)*\.)+[а-яА-ЯёЁa-zA-Z-]{2,}):((?:[123456789])(?:[0-9]{1,4}))$/g;

export function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

export function isIP(ip) {
    return ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4);
}

export function getRatio(dividend, divider) {
    return divider && dividend ? (dividend / divider).toFixed(2) : 0;
}
