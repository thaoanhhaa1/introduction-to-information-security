import config from '~/config';

export default function convertStringToNumber(stringArr) {
    return stringArr.reduce(
        (a, b) => [
            ...a,
            ...b.split('').map((char) => config.english.indexOf(char)),
        ],
        [],
    );
}
