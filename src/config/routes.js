const classicalCryptography = '/classical-cryptography';
const modernCryptography = '/modern-cryptography';

const routes = {
    home: '/',
    example1: `${classicalCryptography}/example-1`,
    classicalCryptography,
    twelveZodiacAnimalsPage: `${classicalCryptography}/twelve-zodiac-animals`,
    caesarEncryptionPlus: `${classicalCryptography}/caesar-encryption`,
    playFair: `${classicalCryptography}/play-fair`,
    railFenceCipher: `${classicalCryptography}/rail-fence-cipher`,
    rsa: `${modernCryptography}/rsa-cipher`,
    notFoundPage: '*',
};

export default routes;
