import routes from './routes';

const config = {
    routes,
    classicalCryptographyList: [
        { title: 'Ví dụ 1', to: routes.example1 },
        { title: 'Mã hóa 12 con giáp', to: routes.twelveZodiacAnimalsPage },
        { title: 'Mã hóa Caesar: Cộng', to: routes.caesarEncryptionPlus },
    ],
    english: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ],
    vietnamese: [
        'A',
        'Ă',
        'Â',
        'B',
        'C',
        'D',
        'Đ',
        'E',
        'Ê',
        'G',
        'H',
        'I',
        'K',
        'L',
        'M',
        'N',
        'O',
        'Ô',
        'Ơ',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'Ư',
        'V',
        'X',
        'Y',
    ],
    languageList: [
        {
            value: 'vietnamese',
            label: 'Tiếng Việt',
        },
        {
            value: 'english',
            label: 'Tiếng Anh',
        },
    ],
    twelveZodiacAnimals: [
        'Tí',
        'Sửu',
        'Dần',
        'Mẹo',
        'Thìn',
        'Tỵ',
        'Ngọ',
        'Mùi',
        'Thân',
        'Dậu',
        'Tuất',
        'Hợi',
    ],
    twelveZodiacAnimalsObj: {
        0: 'Tí',
        1: 'Sửu',
        2: 'Dần',
        3: 'Mẹo',
        4: 'Thìn',
        5: 'Tỵ',
        6: 'Ngọ',
        7: 'Mùi',
        8: 'Thân',
        9: 'Dậu',
        10: 'Tuất',
        11: 'Hợi',
    },
};

export default config;
