import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useToggle from '~/hooks/useToggle';
import { classNames } from '~/utils';
import Button from '../Button';
import ContentItem from '../ContentItem/ContentItem';
import EncryptionResult from '../EncryptionResult';
import FormGroup from '../FormGroup';
import GridInput from '../GridInput';
import { ClearIcon, MinusIcon, PlusIcon } from '../Icons';
import Input from '../Input';
import Label from '../Label';
import Textarea from '../Textarea';

// TODO Validation

const MatrixDecrypt = () => {
    const { handleSubmit, setValue, control } = useForm({
        mode: 'onChange',
    });
    const [isMatrix, setMatrix] = useToggle();
    const [lengthMatrix, setCountMatrix] = useState(3);
    const [decrypt, setDecrypt] = useState();
    const [errors, setErrors] = useState({});
    const matrixRef = useRef();
    const textareaRef = useRef();

    const handleValid = (values) => {
        setDecrypt();
        setErrors();
        const decrypt = values.decrypt.toUpperCase();

        if (!decrypt || !values.matrix) {
            if (!decrypt)
                setErrors((prev) => ({
                    ...prev,
                    decrypt: {
                        message: 'Vui lòng nhập chuỗi cần giải mã',
                    },
                }));
            if (!values.matrix)
                setErrors((prev) => ({
                    ...prev,
                    matrix: {
                        message: 'Vui lòng nhập ma trận cần giải mã',
                    },
                }));
            return;
        }

        let listIndex;
        let matrix;

        listIndex = decrypt.split('-');
        for (let i = 0; i < listIndex.length; i++) {
            listIndex[i] = listIndex[i].split(', ');
        }

        if (typeof values.matrix === 'object') {
            matrix = values.matrix;
        } else {
            matrix = values.matrix.split('\n');
            for (let i = 0; i < matrix.length; i++) {
                matrix[i] = matrix[i].split(' ');
            }
        }

        const result = listIndex
            .reduce(
                (current, item) =>
                    current +
                    ' ' +
                    item
                        .map((i) => {
                            const [a, b] = i.split('.');
                            if (!a || !b) return '';
                            return matrix?.[+a - 1]?.[+b - 1].toUpperCase();
                        })
                        .join(''),
                '',
            )
            .trim();

        setDecrypt(result);
    };

    const handleClear = () => {
        matrixRef.current?.handleClear?.();
        textareaRef.current?.handleClear?.();
    };

    return (
        <ContentItem title="Giải mã">
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <FormGroup>
                    <Label htmlFor="decrypt">Chuỗi cần giải mã</Label>
                    <Input
                        invalid={errors?.decrypt}
                        name="decrypt"
                        control={control}
                        placeholder="Ex: 1.3, 2.2-2.2, 3.1, 1.3-4.3, 1.3, 2.2, 1.2"
                    />
                    {errors?.decrypt && (
                        <FormGroup.Error>
                            {errors.decrypt.message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                <FormGroup className="mt-4">
                    <Label htmlFor="matrix">Ma trận</Label>
                    <GridInput
                        setValue={setValue}
                        className={classNames(isMatrix ? '' : 'hidden')}
                        ref={matrixRef}
                        count={lengthMatrix}
                        name="matrix"
                    />
                    <Textarea
                        name="matrix"
                        className={classNames(isMatrix ? 'hidden' : '')}
                        ref={textareaRef}
                        invalid={errors?.matrix}
                        setValueForm={setValue}
                        placeholder="A B C
D E F
G H I"
                    ></Textarea>
                    {errors?.matrix && (
                        <FormGroup.Error className="mb-2">
                            {errors.matrix.message}
                        </FormGroup.Error>
                    )}
                    <div className="mt-2 flex gap-2">
                        <Button
                            onClick={() => {
                                setMatrix();
                                handleClear();
                            }}
                            secondary
                            small
                        >
                            Cells
                        </Button>
                        <Button onClick={handleClear} secondary small>
                            <ClearIcon />
                        </Button>
                        {isMatrix && (
                            <>
                                <Button
                                    onClick={() =>
                                        setCountMatrix((prev) => prev + 1)
                                    }
                                    secondary
                                    small
                                >
                                    <PlusIcon />
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCountMatrix((prev) =>
                                            Math.max(0, prev - 1),
                                        )
                                    }
                                    secondary
                                    small
                                >
                                    <MinusIcon />
                                </Button>
                            </>
                        )}
                    </div>
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

export default MatrixDecrypt;
