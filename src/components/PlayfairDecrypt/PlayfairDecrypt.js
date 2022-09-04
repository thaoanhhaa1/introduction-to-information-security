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
        decryption: yup.string().required('Vui lòng nhập chuỗi cần giải mã'),
        'key-decryption': yup
            .string()
            .required('Vui lòng nhập khóa để giải mã'),
    })
    .required();

const PlayfairDecrypt = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [decrypts, setDecrypts] = useState([]);

    const handleValid = (values) => {
        const arr = [];
        const obj = {};
        const string = values.decryption
            .toUpperCase()
            .replaceAll('J', 'I')
            .replaceAll(' ', '');
        const key = values['key-decryption']
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
            .filter((item) => config.english.includes(item));
        new Set(key.split('')).forEach(handleAddCharToMatrix);
        config.english.forEach(handleAddCharToMatrix);

        let res = '';
        const resAll = [];
        const length = inputCharList.length;

        for (let i = 0; i < length; i += 2) {
            const [x1, y1] = obj[inputCharList[i]];
            if (i + 1 >= length) {
                resAll.push(res + `${matrix[x1][(y1 + 4) % 5]}`);
                resAll.push(res + `${matrix[(x1 + 4) % 5][y1]}`);
            } else {
                const [x2, y2] = obj[inputCharList[i + 1]];

                if (x1 === x2) {
                    res += `${matrix[x1][(y1 + 4) % 5]}${
                        matrix[x2][(y2 + 4) % 5]
                    }`;
                } else if (y1 === y2) {
                    res += `${matrix[(x1 + 4) % 5][y1]}${
                        matrix[(x2 + 4) % 5][y2]
                    }`;
                } else {
                    res += `${matrix[x1][y2]}${matrix[x2][y1]}`;
                }
            }
        }

        if (!resAll.length) resAll.push(res);

        setDecrypts(
            resAll.reduce((a, item) => {
                if (item.includes('I')) {
                    return [...a, item, item.replaceAll('I', 'J')];
                }
                return [...a, item];
            }, []),
        );
    };

    return (
        <ContentItem title="Giải mã">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    error={!!errors.decryption}
                    helperText={errors.decryption?.message}
                    fullWidth
                    label="Chuỗi cần giải mã"
                    {...register('decryption')}
                    variant="filled"
                />
                <TextField
                    className="!mt-4"
                    error={!!errors['key-decryption']}
                    helperText={errors['key-decryption']?.message}
                    fullWidth
                    label="Khóa"
                    {...register('key-decryption')}
                    variant="filled"
                />
                <Button
                    className="min-w-[200px] mx-auto mt-5"
                    primary
                    type="submit"
                >
                    Giải mã
                </Button>
            </form>
            {decrypts.length > 0 && (
                <div className="mt-6">
                    {' '}
                    Chuỗi sau khi giải mã là:
                    <strong>
                        <ol>
                            {decrypts.map((encrypt, index) => (
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

export default PlayfairDecrypt;
