import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import config from '~/config';
import Button from '../Button';
import ContentItem from '../ContentItem/ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import Input from '../Input';

const schema = yup.object({
    string: yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
});

const TwelveZodiacAnimalsEncrypt = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const [encrypt, setEncrypt] = useState();
    const [error, setError] = useState();
    const [, startTransition] = useTransition();
    const stringWatch = watch('string');

    useEffect(() => {
        setEncrypt();
    }, [stringWatch]);

    const handleValid = (values) => {
        setEncrypt();
        startTransition(() => {
            const words = values.string.replace(/[,.]/, '').split(' ');
            if (words.length > 12) {
                setError('Chuỗi không được vượt quá 12 từ');
                return;
            }
            const twelveZodiacAnimalsRandom = config.twelveZodiacAnimals
                .sort(() => Math.random() - 0.5)
                .slice(0, words.length);
            let i = 0;
            const res = words
                .map((word) => {
                    while (
                        !twelveZodiacAnimalsRandom.includes(
                            config.twelveZodiacAnimalsObj[i],
                        ) &&
                        i < 12
                    )
                        i++;

                    return `${
                        config.twelveZodiacAnimalsObj[i++]
                    } ${word[0].toUpperCase()}${word.substring(1)}`;
                })
                .sort(() => Math.random() - 0.5)
                .join(' - ');
            setEncrypt(res);
        });
    };

    return (
        <ContentItem title="Mã hóa">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Input
                        invalid={errors.string}
                        control={control}
                        name="string"
                        placeholder="Chuỗi cần mã hóa..."
                    ></Input>
                    {(errors.string || error) && (
                        <FormGroup.Error>
                            {errors?.string?.message ?? error}
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

export default TwelveZodiacAnimalsEncrypt;
