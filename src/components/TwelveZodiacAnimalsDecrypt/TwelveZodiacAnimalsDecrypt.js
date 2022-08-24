import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import config from '~/config';
import convertCapitalize from '~/utils/convertCapitalize';
import Button from '../Button';
import ContentItem from '../ContentItem';
import FormGroup from '../FormGroup';
import Input from '../Input';

const schema = yup.object({
    string: yup.string().required('Vui lòng nhập chuỗi cần mã hóa'),
});

const TwelveZodiacAnimalsDecrypt = () => {
    const {
        handleSubmit,
        control,
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
                <FormGroup>
                    <Input
                        invalid={errors.string}
                        control={control}
                        name="string"
                        placeholder="Ex: Hợi Học - Tí Tin"
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
                    Giải mã
                </Button>
            </form>
            {decrypt && (
                <div className="mt-6">
                    Chuỗi sau khi được giải mã là: <strong>{decrypt}</strong>
                </div>
            )}
        </ContentItem>
    );
};

export default TwelveZodiacAnimalsDecrypt;
