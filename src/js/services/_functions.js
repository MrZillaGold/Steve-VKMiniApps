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
    document.querySelector("input").addEventListener("keydown", function(e) {
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
    const green = require('../panels/home/img/green.gif');
    const yellow = require('../panels/home/img/yellow.gif');
    const red = require('../panels/home/img/red.gif');
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
