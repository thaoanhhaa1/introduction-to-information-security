import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import ContentItem from '../ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import RadioGroup from '../RadioGroup';

const languages = [
    {
        value: 'english',
        label: 'Tiếng Anh',
    },
    {
        value: 'vietnamese',
        label: 'Tiếng Việt',
    },
];

const CaesarEncryptionPlusDecrypt = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [decrypt, setDecrypt] = useState();

    const handleValid = (values) => {
        console.log('🚀 ~ handleValid ~ values', values);
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
                        radioList={languages}
                        control={control}
                        name="language"
                    ></RadioGroup>
                    {errors.language && (
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
                    Giải mã
                </Button>
            </form>
            <EncryptionResult isEncryption={false} encryptionResult={decrypt} />
        </ContentItem>
    );
};

export default CaesarEncryptionPlusDecrypt;
