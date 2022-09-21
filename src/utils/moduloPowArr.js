import modulePow from './modulePow';

export default function moduloPowArr(arr, pow, n) {
    return arr.map((number) => modulePow(number, pow, n));
}
