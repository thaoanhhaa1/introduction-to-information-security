import { useForm } from 'react-hook-form';
import ContentItem from '../ContentItem';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';

const PlayfairDecrypt = () => {
    const {
        control,
        formState: { errors },
    } = useForm();

    return (
        <ContentItem title="Giải mã">
            <form className="mt-6">
                <FormGroup>
                    <Label htmlFor="decryption">Chuỗi cần giải mã</Label>
                    <Input
                        placeholder="Ex: Information Technology"
                        control={control}
                        name="decryption"
                    ></Input>
                    {errors.decryption && (
                        <FormGroup.Error>
                            errors.decryption.message
                        </FormGroup.Error>
                    )}
                </FormGroup>
            </form>
        </ContentItem>
    );
};

export default PlayfairDecrypt;
