import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import config from '~/config';
import convertCapitalize from '~/utils/convertCapitalize';
import Button from '../Button';
import ContentItem from '../ContentItem';
import EncryptionResult from '../EncryptionResult';

const schema = yup.object({
    string: yup.string().required('Vui lòng nhập chuỗi cần giải mã'),
});

const TwelveZodiacAnimalsDecrypt = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState();
    const [decrypt, setDecrypt] = useState();

    const handleValid = (values) => {
        const words = values.string.trim().split(/ *- */);
        const res = {};

        words.forEach((word) => {
            const [animal, data] = word.split(' ');

            for (let i = 0; i < 12; i++) {
                if (
                    convertCapitalize(animal) ===
                    config.twelveZodiacAnimalsObj[i]
                )
                    res[i] = data;
            }
        });

        if (Object.keys(res).length === 0) setError('Chuỗi không hợp lệ');

        setDecrypt(() =>
            Object.keys(res)
                .map((key) => res[key])
                .join(' '),
        );
    };

    return (
        <ContentItem title="Giải mã">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    id="string"
                    {...register('string')}
                    label="Chuỗi cần giải mã"
                    variant="filled"
                    fullWidth
                    helperText={errors?.string?.message ?? error}
                    error={!!(errors?.string?.message ?? error)}
                />
                <Button
                    className="min-w-[200px] mx-auto mt-5"
                    primary
                    type="submit"
                >
                    Giải mã
                </Button>
            </form>
            <EncryptionResult isEncryption={false} encryptionResult={decrypt} />
        </ContentItem>
    );
};

export default TwelveZodiacAnimalsDecrypt;
