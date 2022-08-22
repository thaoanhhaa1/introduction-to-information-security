import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import Button from '~/components/Button';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import RadioGroup from '~/components/RadioGroup';
import config from '~/config';
import createMatrix from '~/utils/createMatrix';
import getRandomNumber from '~/utils/getRandomNumber';
import getVietNamese from '~/utils/getVietNamese';

const languageList = [
    {
        value: 'vietnamese',
        label: 'Tiếng Việt',
    },
    {
        value: 'english',
        label: 'Tiếng Anh',
    },
];

const MatrixEncryptionPage = () => {
    const { control, handleSubmit } = useForm();
    const [encryption, setEncryption] = useState();
    const [matrix, setMatrix] = useState();

    console.log(getVietNamese('Trần Ngọc Hoan'));

    const handleValid = (values) => {
        const encryptChar = {};
        let index = 1;
        const { encrypt, language } = values;
        const charList = config[language];
        for (let char of encrypt) {
            if (charList.includes(char.toUpperCase()) && !encryptChar[char]) {
                encryptChar[char] = index++;
            }
        }
        const encryptCharKeys = Object.keys(encryptChar);
        const lengthMatrix = Math.max(
            Math.ceil(Math.pow(encryptCharKeys.length, 0.5)),
            4,
        );
        const matrixChar = createMatrix(lengthMatrix, lengthMatrix);
        encryptCharKeys.forEach((char, index) => {
            let j;
            do {
                j = getRandomNumber(lengthMatrix);
            } while (matrixChar[index % lengthMatrix][j]);
            matrixChar[index % lengthMatrix][j] = char.toUpperCase();
            encryptChar[char] = [index % lengthMatrix, j];
        });
        const lengthCharList = charList.length;
        for (let i = 0; i < lengthMatrix; i++)
            for (let j = 0; j < lengthMatrix; j++)
                if (!matrixChar[i][j]) {
                    matrixChar[i][j] =
                        charList[getRandomNumber(lengthCharList)];
                }

        let res = '';
        for (let char of encrypt) {
            if (encryptCharKeys.includes(char)) {
                if (res && res[res.length - 1] !== '-') res += ', ';
                res += `${encryptChar[char][0]}.${encryptChar[char][1]}`;
            } else res += '-';
        }

        setEncryption(res);
        setMatrix(matrixChar);
    };

    return (
        <div className="flex gap-4 p-4 max-w-5xl w-full mx-auto mt-[var(--header-height)]">
            <div className="flex-1">
                <Heading>Mã hóa</Heading>
                <form onSubmit={handleSubmit(handleValid)} className="mt-4">
                    <Input
                        name="encrypt"
                        control={control}
                        placeholder="Nhập chuỗi cần mã hóa..."
                    />
                    <RadioGroup
                        className="mt-3"
                        name="language"
                        radioList={languageList}
                        control={control}
                    />
                    <Button
                        className="min-w-[200px] mx-auto mt-3"
                        primary
                        type="submit"
                    >
                        Mã hóa
                    </Button>
                </form>
                {encryption && (
                    <div className="mt-6">
                        Chuỗi sau khi được mã hóa là:{' '}
                        <strong>{encryption}</strong>
                    </div>
                )}
                {matrix && matrix[0] && matrix[0][0] && (
                    <div className="flex flex-col mt-2">
                        {matrix.map((item) => (
                            <div key={v4()} className="flex">
                                {item.map((i) => (
                                    <div
                                        key={v4()}
                                        className="flex justify-center items-center w-[50px] h-[50px] p-4 border border-text-4"
                                    >
                                        {i}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-[1px] bg-black"></div>
            <div className="flex-1">MatrixEncryptionPage</div>
        </div>
    );
};

export default MatrixEncryptionPage;
