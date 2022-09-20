import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button as ButtonMUI,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { gcd, inverseMultiplyModulo } from '~/utils';
import Button from '../Button';

const schema = yup
    .object({
        q: yup.string().required('Vui lòng nhập q'),
        p: yup.string().required('Vui lòng nhập p'),
    })
    .required();

const KeyRSAEncryption = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const [errorPQ, setErrorPQ] = useState();
    const [errorKeys, setErrorKeys] = useState();
    const [boundaryE, setBoundaryE] = useState();
    const [e, setE] = useState('');
    const [n, setN] = useState();
    const [keys, setKeys] = useState();

    const handleValid = (values) => {
        setErrorPQ();
        setBoundaryE();
        setN();
        setKeys();
        const q = +values.q,
            p = +values.p;

        if (gcd(p, q) !== 1) {
            setErrorPQ('P và Q phải là 2 số nguyên tố cùng nhau');
            return;
        }
        setN(p * q);
        setBoundaryE((p - 1) * (q - 1));
    };

    const getKey = (ev) => {
        ev.preventDefault();
        if (!e) {
            setErrorKeys('Vui lòng chọn E');
            return;
        }
        const d = inverseMultiplyModulo(boundaryE, e);

        setKeys({
            pu: {
                e,
                n,
            },
            pr: {
                d: d > 0 ? d : d + boundaryE,
                n,
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)} className="mt-6">
                <TextField
                    fullWidth
                    error={!!errorPQ || !!errors.p}
                    helperText={errors.p?.message}
                    label="p"
                    {...register('p')}
                    variant="filled"
                    type="number"
                    inputProps={{ min: '1' }}
                />
                <TextField
                    className="!mt-5"
                    fullWidth
                    error={!!errorPQ || !!errors.q}
                    helperText={errorPQ ?? errors.q?.message}
                    label="q"
                    {...register('q')}
                    variant="filled"
                    type="number"
                    inputProps={{ min: '1' }}
                />
                <ButtonMUI
                    className="!text-primary !border-primary !mt-5"
                    variant="outlined"
                    type="submit"
                >
                    Tìm e
                </ButtonMUI>
            </form>
            {boundaryE && !errors.q && !errors.p && (
                <form onSubmit={getKey}>
                    <FormControl fullWidth className="!mt-5">
                        <InputLabel id="demo-simple-select-label">E</InputLabel>
                        <Select
                            error={!!errorKeys}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={e}
                            label="E"
                            onChange={(e) => {
                                setKeys();
                                setErrorKeys();
                                setE(e.target.value);
                            }}
                        >
                            {new Array(boundaryE - 2)
                                .fill(0)
                                .map((item, index) => {
                                    if (gcd(index + 2, boundaryE) !== 1)
                                        return null;

                                    return (
                                        <MenuItem key={v4()} value={index + 2}>
                                            {index + 2}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                        <FormHelperText>{errorKeys}</FormHelperText>
                    </FormControl>
                    <Button
                        className="min-w-[200px] mx-auto mt-5"
                        primary
                        type="submit"
                    >
                        Tìm khóa
                    </Button>
                </form>
            )}
            {keys && (
                <div className="mt-6">
                    <div>
                        Khóa công khai:{' '}
                        <strong>
                            ({keys.pu.e}, {keys.pu.n})
                        </strong>
                    </div>
                    <div>
                        Khóa riêng tư:{' '}
                        <strong>
                            ({keys.pr.d}, {keys.pr.n})
                        </strong>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyRSAEncryption;
