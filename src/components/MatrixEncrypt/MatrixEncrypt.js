import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from 'yup';
import config from '~/config';
import { createMatrix, getRandomNumber } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem/ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import RadioGroup from '../RadioGroup';

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
        const { language } = values;
        const encrypt = values.encrypt.toUpperCase();
        const charList = config[language];
        for (let char of encrypt) {
            if (charList.includes(char) && !encryptChar[char]) {
                encryptChar[char] = index++;
            }
        }
        const encryptCharKeys = Object.keys(encryptChar);
        const lengthMatrix = Math.max(
            Math.ceil(Math.pow(encryptCharKeys.length, 0.5)),
            4,
        );
        const matrixChar = createMatrix(lengthMatrix, lengthMatrix);
        const matrixIndex = [];
        for (let i = 0; i < lengthMatrix; i++)
            for (let j = 0; j < lengthMatrix; j++) matrixIndex.push([i, j]);

        matrixIndex.sort(() => Math.random() - 0.5);
        encryptCharKeys.forEach((char, index) => {
            const [i, j] = matrixIndex[index];
            matrixChar[i][j] = char.toUpperCase();
            encryptChar[char] = [i, j];
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
        <ContentItem title="Mã hóa">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Label htmlFor="encrypt">Chuỗi cần mã hóa</Label>
                    <Input
                        invalid={errors?.encrypt}
                        name="encrypt"
                        control={control}
                        placeholder="Ex: Information Technology"
                    />
                    {errors?.encrypt && (
                        <FormGroup.Error>
                            {errors.encrypt.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup className="mt-4">
                    <Label>Ngôn ngữ</Label>
                    <RadioGroup
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
            <EncryptionResult encryptionResult={encryption} />
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
        </ContentItem>
    );
};

export default MatrixEncrypt;
