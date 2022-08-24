import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import config from '~/config';
import { createMatrix, getRandomNumber } from '~/utils';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Input';
import RadioGroup from '../RadioGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormGroup from '../FormGroup';

const schema = yup
    .object({
        encrypt: yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
        language: yup
            .string()
            .required('Vui lòng chọn loại ngôn ngữ cần mã hóa'),
    })
    .required();

const MatrixEncrypt = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [encryption, setEncryption] = useState();
    const [matrix, setMatrix] = useState();

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
                res += `${encryptChar[char][0] + 1}.${
                    encryptChar[char][1] + 1
                }`;
            } else res += '-';
        }

        setEncryption(res);
        setMatrix(matrixChar);
    };

    return (
        <div className="w-full md:flex-1">
            <Heading>Mã hóa</Heading>
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Input
                        invalid={errors?.encrypt}
                        name="encrypt"
                        control={control}
                        placeholder="Nhập chuỗi cần mã hóa..."
                    />
                    {errors?.encrypt && (
                        <FormGroup.Error>
                            {errors.encrypt.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup>
                    <RadioGroup
                        className="mt-4"
                        name="language"
                        radioList={config.languageList}
                        control={control}
                    />
                    {errors?.language && (
                        <FormGroup.Error>
                            {errors.language.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <Button
                    className="min-w-[200px] mx-auto mt-5"
                    primary
                    type="submit"
                >
                    Mã hóa
                </Button>
            </form>
            {encryption && (
                <div className="mt-6">
                    Chuỗi sau khi được mã hóa là: <strong>{encryption}</strong>
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
    );
};

export default MatrixEncrypt;
