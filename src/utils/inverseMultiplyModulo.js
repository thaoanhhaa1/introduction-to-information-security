// return b^(-1) mod a

export default function inverseMultiplyModulo(a, b) {
    let r1 = +a,
        r2 = +b,
        t1 = 0,
        t2 = 1;
    let q, r, t;

    while (r2 > 0) {
        q = Math.floor(r1 / r2);
        r = r1 - q * r2;
        r1 = r2;
        r2 = r;

        t = t1 - q * t2;
        t1 = t2;
        t2 = t;
    }

    return t1;
}
