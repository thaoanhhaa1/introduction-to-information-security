import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import config from '~/config';
import { createMatrix } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';

const PlayfairDecrypt = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
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
                resAll.push(res + `${matrix[x1][(y1 - 1) % 5]}`);
                resAll.push(res + `${matrix[(x1 - 1) % 5][y1]}`);
            } else {
                const [x2, y2] = obj[inputCharList[i + 1]];

                if (x1 === x2) {
                    res += `${matrix[x1][(y1 - 1) % 5]}${
                        matrix[x2][(y2 - 1) % 5]
                    }`;
                } else if (y1 === y2) {
                    res += `${matrix[(x1 - 1) % 5][y1]}${
                        matrix[(x2 - 1) % 5][y2]
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

        console.log('🚀 ~ handleValid ~ matrix', matrix);
    };

    return (
        <ContentItem title="Mã hóa">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Label htmlFor="decryption">Chuỗi cần giải mã</Label>
                    <Input
                        placeholder="Ex: Information Technology"
                        control={control}
                        name="decryption"
                    ></Input>
                    {errors.decryption && (
                        <FormGroup.Error>
                            {errors.decryption.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup className="mt-4">
                    <Label htmlFor="key-decryption">Khóa</Label>
                    <Input
                        placeholder="Ex: Monday"
                        control={control}
                        name="key-decryption"
                    ></Input>
                    {errors['key-decryption'] && (
                        <FormGroup.Error>
                            {errors['key-decryption'].message}
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
