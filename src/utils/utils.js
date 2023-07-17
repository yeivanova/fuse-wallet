export const truncate = (str, length) => {
    if (str.length > length) {
        return str.slice(0, length) + "....." + str.slice(-5);
    } else return str;
};

export const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
