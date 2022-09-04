import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from 'yup';
import config from '~/config';
import { createMatrix } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem';

const schema = yup
    .object({
        encryption: yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
        'key-encryption': yup.string().required('Vui lòng nhập khóa để mã hóa'),
    })
    .required();

const PlayfairEncrypt = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [encrypts, setEncrypts] = useState([]);

    const handleValid = (values) => {
        const arr = [];
        const obj = {};
        const string = values.encryption
            .toUpperCase()
            .replaceAll('J', 'I')
            .replaceAll(' ', '');
        const key = values['key-encryption']
            .toUpperCase()
            .replaceAll('J', 'I')
            .replaceAll(' ', '');
        const matrix = createMatrix(5, 5);
        let i = 0,
            j = 0;
        const handleAddCharToMatrix = (char) => {
            if (arr.includes(char) || char === 'J') return;
            matrix[i][j] = char;
            obj[char] = [i, j];
            arr.push(char);
            if (j === 4) {
                i++;
                j = 0;
            } else j++;
        };
        const inputCharList = string
            .split('')
            .filter((item) => config.english.includes(item))
            .reduce((a, item) => {
                if (a.length === 0) return [item];
                if (a[a.length - 1] === item) return [...a, 'X', item];
                return [...a, item];
            }, []);
        new Set(key.split('')).forEach(handleAddCharToMatrix);
        config.english.forEach(handleAddCharToMatrix);

        let res = '';
        const resAll = [];
        const length = inputCharList.length;

        for (let i = 0; i < length; i += 2) {
            const [x1, y1] = obj[inputCharList[i]];
            if (i + 1 >= length) {
                resAll.push(res + `${matrix[x1][(y1 + 1) % 5]}`);
                resAll.push(res + `${matrix[(x1 + 1) % 5][y1]}`);
            } else {
                const [x2, y2] = obj[inputCharList[i + 1]];

                if (x1 === x2) {
                    res += `${matrix[x1][(y1 + 1) % 5]}${
                        matrix[x2][(y2 + 1) % 5]
                    }`;
                } else if (y1 === y2) {
                    res += `${matrix[(x1 + 1) % 5][y1]}${
                        matrix[(x2 + 1) % 5][y2]
                    }`;
                } else {
                    res += `${matrix[x1][y2]}${matrix[x2][y1]}`;
                }
            }
        }

        if (!resAll.length) resAll.push(res);

        setEncrypts(
            resAll.reduce((a, item) => {
                if (item.includes('I')) {
                    return [...a, item, item.replaceAll('I', 'J')];
                }
                return [...a, item];
            }, []),
        );
    };

    return (
        <ContentItem title="Mã hóa">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    error={!!errors.encryption}
                    helperText={errors.encryption?.message}
                    fullWidth
                    label="Chuỗi cần mã hóa"
                    {...register('encryption')}
                    variant="filled"
                />
                <TextField
                    className="!mt-4"
                    error={!!errors['key-encryption']}
                    helperText={errors['key-encryption']?.message}
                    fullWidth
                    label="Khóa"
                    {...register('key-encryption')}
                    variant="filled"
                />
                <Button
                    className="min-w-[200px] mx-auto mt-5"
                    primary
                    type="submit"
                >
                    Mã hóa
                </Button>
            </form>
            {encrypts.length > 0 && (
                <div className="mt-6">
                    {' '}
                    Chuỗi sau khi mã hóa là:
                    <strong>
                        <ol>
                            {encrypts.map((encrypt, index) => (
                                <li key={v4()}>
                                    {index + 1}. {encrypt}
                                </li>
                            ))}
                        </ol>
                    </strong>
                </div>
            )}
        </ContentItem>
    );
};

export default PlayfairEncrypt;
