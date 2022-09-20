export default function convertDecToBin(dec) {
    let decNumber = +dec;
    const res = [];

    while (decNumber > 0) {
        res.unshift(decNumber % 2);
        decNumber = Math.floor(decNumber / 2);
    }

    return res;
}
