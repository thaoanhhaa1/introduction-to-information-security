import config from '~/config';

export default function convertNumberToString(stringArr) {
    return stringArr.reduce((a, b) => [...a, config.english[b % 26]], []);
}
