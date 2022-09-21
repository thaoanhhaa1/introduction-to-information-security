import { TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import convertNumberToString from '~/utils/convertNumberToString';
import convertStringToNumber from '~/utils/convertStringToNumber';
import moduloPowArr from '~/utils/moduloPowArr';
import Button from '../Button';
import FormGroup from '../FormGroup';
import RadioGroup from '../RadioGroup';

const RSAEncoding = () => {
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [result, setResult] = useState([]);

    const handleValid = (values) => {
        setResult();
        const stringArr = values.string.toUpperCase().split(' ');
        const isNumber = !!Number.parseInt(stringArr[0]);

        const numberArr = isNumber
            ? stringArr
            : convertStringToNumber(stringArr);

        let res;

        if (+values.type === 3) {
            const keys =
                +values['type-encoding'] === 1
                    ? [+values.pr1, +values.pu2]
                    : [+values.pr2, +values.pu1];
            const ns =
                +values['type-encoding'] === 1
                    ? [+values.n1, +values.n2]
                    : [+values.n2, +values.n1];

            res = moduloPowArr(
                moduloPowArr(numberArr, keys[0], ns[0]),
                keys[1],
                ns[1],
            );
        } else {
            res =
                +values['type-encoding'] === 1
                    ? moduloPowArr(
                          numberArr,
                          +values.type === 1 ? +values.pu1 : +values.pr1,
                          +values.n1,
                      )
                    : moduloPowArr(
                          numberArr,
                          +values.type === 1 ? +values.pr1 : +values.pu1,
                          +values.n1,
                      );
        }
        setResult(isNumber ? res : [convertNumberToString(res).join('')]);
    };

    const type = watch('type');
    const string = watch('string');
    const typeEncoding = watch('type-encoding');

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    fullWidth
                    label="Chuỗi cần mã hóa/ giải mã"
                    {...register('string')}
                    variant="filled"
                />
                <FormGroup className="mt-5">
                    <RadioGroup
                        radioList={[
                            {
                                value: '1',
                                label: 'Mã hóa bảo mật',
                            },
                            {
                                value: '2',
                                label: 'Mã hóa chứng thực',
                            },
                            {
                                value: '3',
                                label: 'Mã hóa kết hợp',
                            },
                        ]}
                        control={control}
                        name="type"
                    ></RadioGroup>
                    {errors?.['type'] && (
                        <FormGroup.Error>
                            {errors['type'].message}
                        </FormGroup.Error>
                    )}
                </FormGroup>
                {type && string && (
                    <>
                        <TextField
                            className="!mt-5"
                            fullWidth
                            label="Khóa công khai A"
                            {...register('pu1')}
                            variant="filled"
                            type="number"
                            inputProps={{ min: '1' }}
                        />
                        <TextField
                            className="!mt-5"
                            fullWidth
                            label="Khóa riêng tư A"
                            {...register('pr1')}
                            variant="filled"
                            type="number"
                            inputProps={{ min: '1' }}
                        />
                        <TextField
                            className="!mt-5"
                            fullWidth
                            label="N A"
                            {...register('n1')}
                            variant="filled"
                            type="number"
                            inputProps={{ min: '1' }}
                        />
                        {type === '3' && (
                            <>
                                <TextField
                                    className="!mt-5"
                                    fullWidth
                                    label="Khóa công khai B"
                                    {...register('pu2')}
                                    variant="filled"
                                    type="number"
                                    inputProps={{ min: '1' }}
                                />
                                <TextField
                                    className="!mt-5"
                                    fullWidth
                                    label="Khóa riêng tư B"
                                    {...register('pr2')}
                                    variant="filled"
                                    type="number"
                                    inputProps={{ min: '1' }}
                                />
                                <TextField
                                    className="!mt-5"
                                    fullWidth
                                    label="N B"
                                    {...register('n2')}
                                    variant="filled"
                                    type="number"
                                    inputProps={{ min: '1' }}
                                />
                            </>
                        )}
                        <FormGroup className="mt-5">
                            <RadioGroup
                                radioList={[
                                    {
                                        value: '1',
                                        label: 'Mã hóa',
                                    },
                                    {
                                        value: '2',
                                        label: 'Giải mã',
                                    },
                                ]}
                                control={control}
                                name="type-encoding"
                            ></RadioGroup>
                            {errors?.['type-encoding'] && (
                                <FormGroup.Error>
                                    {errors['type-encoding'].message}
                                </FormGroup.Error>
                            )}
                        </FormGroup>
                    </>
                )}
                {typeEncoding && (
                    <Button
                        className="min-w-[200px] mx-auto mt-5"
                        primary
                        type="submit"
                    >
                        Mã hóa
                    </Button>
                )}
            </form>
            {result.length > 0 && (
                <div className="mt-6">
                    Kết quả sau khi mã hóa:
                    <strong>&nbsp;{result.join(' ')}</strong>
                </div>
            )}
        </div>
    );
};

export default RSAEncoding;
