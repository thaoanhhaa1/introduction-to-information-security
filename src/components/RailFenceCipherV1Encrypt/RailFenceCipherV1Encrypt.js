import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from 'yup';
import config from '~/config';
import { createMatrix } from '~/utils';
import Button from '../Button';

function railFenceCipherV1Encrypt(string, depth) {
    const matrix = createMatrix(depth);
    const language = config.english;

    string
        .split('')
        .filter((i) => language.includes(i.toUpperCase()))
        .forEach((char, index) => {
            matrix[index % depth].push(char.toUpperCase());
        });

    return matrix.reduce((a, b) => a + b.join(''), '');
}

const schema = yup
    .object({
        depth: yup.string().required('Vui lòng nhập độ sâu'),
        'string-v1': yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
        'counter-v1': yup.string().required('Vui lòng nhập số lần hoán vị'),
    })
    .required();

const RailFenceCipherV1Encrypt = () => {
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
        let counter = ~~values['counter-v1'];
        let string = values['string-v1'];
        const depth = ~~values.depth;
        const res = [];

        while (counter-- > 0) {
            string = railFenceCipherV1Encrypt(string, depth);

            res.push(string);
        }

        setEncrypt(res);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    fullWidth
                    error={!!errors['string-v1']}
                    helperText={errors['string-v1']?.message}
                    label="Chuỗi cần mã hóa"
                    {...register('string-v1')}
                    variant="filled"
                />
                <TextField
                    error={!!errors['depth']}
                    helperText={errors['depth']?.message}
                    className="!mt-5"
                    fullWidth
                    label="Độ sâu"
                    {...register('depth')}
                    variant="filled"
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <TextField
                    type="number"
                    error={!!errors['counter-v1']}
                    helperText={errors['counter-v1']?.message}
                    className="!mt-5"
                    fullWidth
                    label="Số lần hoán vị"
                    {...register('counter-v1')}
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

export default RailFenceCipherV1Encrypt;
