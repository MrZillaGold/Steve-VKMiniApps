import { NameMC } from "namemcwrapper";

export const PROXY = "https://stevecors.herokuapp.com/";
export const ASHCON_ENDPOINT  = "https://api.ashcon.app/mojang/v2";
export const SLOTHPIXEL_ENDPOINT = "https://api.slothpixel.me/api";
export const MCSRVSTAT_ENDPOINT = "https://api.mcsrvstat.us/2";
export const MINECRAFT_STATISTIC_ENDPOINT = "https://minecraft-statistic.net/api";

export const STORY_BACKGROUNDS = [
    "https://sun1-89.userapi.com/KuxE4p0_eMMsy-zoDTwjOGdP-bABJyg9W2jkTQ/ZTRT9qKrJxE.jpg",
    "https://sun1-15.userapi.com/_swcoPn4QQsqSOdiHOKgveXC6FKvGip0zwtQTw/2KE8Qqhm9aM.jpg",
    "https://sun1-97.userapi.com/ugFzgWC1mztS1RVU7EjKg8RYXWr6gjOUIDAHog/jK07Gyw57q0.jpg",
    "https://sun1-87.userapi.com/pKoppSSgergzXYlryFblG4iO8em0LL6apARaow/oPWJde2SxTQ.jpg",
    "https://sun1-85.userapi.com/KpM6KUrM-sIIEUGPZ8tppNl-61RExXl15G5xMw/sg_lnwXqGVs.jpg"
];

export const nameMc = new NameMC({
    proxy: "https://stevecors.herokuapp.com",
    rendersIgnoreProxy: true,
    defaultSkinsModel: "slim"
});

const pad = (number) => {
    return number > 9 ? number : `0${number}`;
};

export function timeConvert(time) {
    const currentDate = new Date(time);

    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${pad(date)}.${pad(month)}.${year}`;
}

export function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// https://stackoverflow.com/a/38578855
const ipRegExp = /^((?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?::([0-9]{1,5}))?$/g;

export function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

export function isIP(ip) {
    return ip.match(ipRegExp);
}

export function getRatio(dividend, divider) {
    return divider && dividend ?
        (dividend / divider)
        .toFixed(2)
        :
        0;
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

export function parseIP(ip) {
    const ipMatch = ip.match(/([^]+):([\d]+)/);

    return {
        host: ipMatch ? ipMatch[1] : ip,
        port: ipMatch ? parseInt(ipMatch[2]) : 25565
    };
}
