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

export const randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

export const checkStatus = (status) => {
    if (status === "green") {
        return {"img" : 'https://s3.amazonaws.com/assets.mojang.com/Happy-Server.gif', "text" : "Всё в порядке"};
    }
    if (status === "yellow") {
        return {"img" : 'https://s3.amazonaws.com/assets.mojang.com/Mellow-Server.gif', "text" : "Небольшие неполадки"};
    }
    if (status === "red") {
        return {"img" : 'https://s3.amazonaws.com/assets.mojang.com/Sad-Server.gif', "text" : "Проблемы с доступностью"};
    }
};
