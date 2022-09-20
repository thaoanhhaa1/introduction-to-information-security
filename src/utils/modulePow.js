import convertDecToBin from './convertDecToBin';

// return a^n mod b
export default function modulePow(a, n, b) {
    const nNumber = +n;
    const aNumber = +a;
    const bNumber = +b;

    let p = 1;
    const binOfN = convertDecToBin(nNumber);

    binOfN.forEach((binI) => {
        p = Math.pow(p, 2);
        p = p % bNumber;
        if (binI === 1) p *= aNumber;
        p = p % bNumber;
    });

    return p;
}
