import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import config from '~/config';
import { getVietNamese } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import RadioGroup from '../RadioGroup';

const schema = yup
    .object({
        decryption: yup.string().required('Vui lòng nhập chuỗi cần giải mã'),
        'decryption-number': yup.string().required('Vui lòng nhập khóa'),
        'decryption-language': yup
            .string()
            .required('Vui lòng chọn loại ngôn ngữ'),
    })
    .required();

const CaesarEncryptionPlusDecrypt = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [decrypt, setDecrypt] = useState();

    const handleValid = (values) => {
        const key = Number(values['decryption-number']);
        const charList = config[values['decryption-language']];
        const string = getVietNamese(values.decryption).toUpperCase();
        const res = string.split('').map((char) => {
            for (let i = 0; i < charList.length; i++) {
                if (char === charList[i]) {
                    return charList[
                        ((i - key < 0 ? charList.length : 0) + (i - key)) %
                            charList.length
                    ];
                }
            }
            return char;
        });
        setDecrypt(res.join(''));
    };

    return (
        <ContentItem title="Giải mã">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Label htmlFor="decryption">Chuỗi cần giải mã</Label>
                    <Input
                        invalid={errors.decryption}
                        control={control}
                        name="decryption"
                        placeholder="Ex: USVPOH EBJ IPD DPOH OHIJFQ"
                    ></Input>
                    {errors.decryption && (
                        <FormGroup.Error>
                            {errors.decryption.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup className="mt-4">
                    <Label htmlFor="decryption-number">Khóa</Label>
                    <Input
                        defaultValue={0}
                        type="number"
                        control={control}
                        name="decryption-number"
                        placeholder="Khóa"
                    ></Input>
                    {errors['decryption-number'] && (
                        <FormGroup.Error>
                            {errors['decryption-number'].message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup className="mt-4">
                    <Label>Ngôn ngữ</Label>
                    <RadioGroup
                        radioList={config.languageList}
                        control={control}
                        name="decryption-language"
                    ></RadioGroup>
                    {errors?.['decryption-language'] && (
                        <FormGroup.Error>
                            {errors['decryption-language'].message}
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
            <EncryptionResult isEncryption={false} encryptionResult={decrypt} />
        </ContentItem>
    );
};

export default CaesarEncryptionPlusDecrypt;
