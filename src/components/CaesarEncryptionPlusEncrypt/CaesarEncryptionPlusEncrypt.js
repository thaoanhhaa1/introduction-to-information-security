import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import config from '~/config';
import { getVietNamese } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import Label from '../Label';
import RadioGroup from '../RadioGroup';

const schema = yup
    .object({
        encryption: yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
        'encryption-number': yup
            .string('Khóa phải là số')
            .required('Vui lòng nhập khóa'),
        'encryption-language': yup
            .string()
            .required('Vui lòng chọn loại ngôn ngữ'),
    })
    .required();

const CaesarEncryptionPlusEncrypt = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [encrypt, setEncrypt] = useState();

    const handleValid = (values) => {
        const key = Number(values['encryption-number']);
        const charList = config[values['encryption-language']];
        const string = getVietNamese(values.encryption).toUpperCase();
        const res = string.split('').map((char) => {
            for (let i = 0; i < charList.length; i++) {
                if (char === charList[i]) {
                    return charList[
                        ((i + key < 0 ? charList.length : 0) + (i + key)) %
                            charList.length
                    ];
                }
            }
            return char;
        });
        setEncrypt(res.join(''));
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
                    error={!!errors['encryption-number']}
                    helperText={errors['encryption-number']?.message}
                    fullWidth
                    label="Khóa"
                    {...register('encryption-number')}
                    variant="filled"
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
                <FormGroup className="mt-4">
                    <Label>Ngôn ngữ</Label>
                    <RadioGroup
                        radioList={config.languageList}
                        control={control}
                        name="encryption-language"
                    ></RadioGroup>
                    {errors?.['encryption-language'] && (
                        <FormGroup.Error>
                            {errors['encryption-language'].message}
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
            <EncryptionResult encryptionResult={encrypt} />
        </ContentItem>
    );
};

export default CaesarEncryptionPlusEncrypt;
