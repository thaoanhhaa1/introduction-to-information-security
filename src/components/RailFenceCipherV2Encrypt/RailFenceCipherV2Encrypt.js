import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from 'yup';
import config from '~/config';
import { createMatrix } from '~/utils';
import Button from '../Button';

const railFenceCipherV2Encrypt = (key, string, arrKey) => {
    const keyLength = key.length;
    const matrix = createMatrix(keyLength, 0);

    string.forEach((char, index) => matrix[index % keyLength].push(char));
    const res = arrKey
        .map((item) => matrix[item.indexBefore].join(''))
        .join('');
    return res;
};

const schema = yup
    .object({
        key: yup.string().trim().required('Vui lòng nhập khóa'),
        'string-v2': yup
            .string()
            .trim()
            .required('Vui lòng nhập chuỗi cần mã hóa'),
        'counter-v2': yup.string().required('Vui lòng nhập số lần hoán vị'),
    })
    .required();

const RailFenceCipherV2Encrypt = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [encrypt, setEncrypt] = useState([]);

    const handleValid = (values) => {
        const language = config.english;
        let counter = ~~values['counter-v2'];
        const key = values.key
            .toUpperCase()
            .split('')
            .filter((char) => language.includes(char));

        const keyCharSort = [...key].sort();
        const arrKey = [];

        const keyTemp = [...key];
        keyCharSort.forEach((char, index) => {
            const indexBefore = keyTemp.indexOf(char);
            keyTemp[indexBefore] = '*';
            arrKey.push({
                index,
                indexBefore: indexBefore,
            });
        });

        const res = [];
        let string = values['string-v2'];

        while (counter-- > 0) {
            string = string
                .toUpperCase()
                .split('')
                .filter((char) => language.includes(char));
            string = railFenceCipherV2Encrypt(key, string, arrKey);
            res.push(string);
        }
        setEncrypt(res);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    fullWidth
                    error={!!errors['string-v2']}
                    helperText={errors['string-v2']?.message}
                    label="Chuỗi cần mã hóa"
                    {...register('string-v2')}
                    variant="filled"
                />
                <TextField
                    error={!!errors['key']}
                    helperText={errors['key']?.message}
                    className="!mt-5"
                    fullWidth
                    label="Khóa"
                    {...register('key')}
                    variant="filled"
                />
                <TextField
                    type="number"
                    error={!!errors['counter-v2']}
                    helperText={errors['counter-v2']?.message}
                    className="!mt-5"
                    fullWidth
                    label="Số lần hoán vị"
                    {...register('counter-v2')}
                    variant="filled"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <Button
                    className="min-w-[200px] mx-auto mt-5"
                    primary
                    type="submit"
                >
                    Mã hóa
                </Button>
            </form>
            {encrypt.length > 0 && (
                <div className="mt-6">
                    Kết quả sau khi mã hóa:
                    {encrypt.map((res, index) => (
                        <div key={v4()}>
                            <strong>
                                Hoán vị lần {index + 1}. {res}
                            </strong>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RailFenceCipherV2Encrypt;
