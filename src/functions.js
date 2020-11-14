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

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.src = src;
        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
    });
}

export function getRandomElement(array) {
    return array[randomInteger(0, array.length - 1)];
}

export const storyBackgrounds = [
    "https://sun1-89.userapi.com/KuxE4p0_eMMsy-zoDTwjOGdP-bABJyg9W2jkTQ/ZTRT9qKrJxE.jpg",
    "https://sun1-15.userapi.com/_swcoPn4QQsqSOdiHOKgveXC6FKvGip0zwtQTw/2KE8Qqhm9aM.jpg",
    "https://sun1-97.userapi.com/ugFzgWC1mztS1RVU7EjKg8RYXWr6gjOUIDAHog/jK07Gyw57q0.jpg",
    "https://sun1-87.userapi.com/pKoppSSgergzXYlryFblG4iO8em0LL6apARaow/oPWJde2SxTQ.jpg",
    "https://sun1-85.userapi.com/KpM6KUrM-sIIEUGPZ8tppNl-61RExXl15G5xMw/sg_lnwXqGVs.jpg"
];
