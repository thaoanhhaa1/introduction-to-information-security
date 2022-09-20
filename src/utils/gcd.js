export default function gcd(a, b) {
    let q, r;

    while (b > 0) {
        q = Math.floor(a / b);
        r = a - q * b;
        a = b;
        b = r;
    }

    return a;
}
