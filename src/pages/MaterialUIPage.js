import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const MaterialUIPage = () => {
    const { handleSubmit, register } = useForm();

    const handleValid = (values) => {
        console.log('🚀 ~ handleValid ~ values', values);
    };

    return (
        <div className="material-ui">
            <form onSubmit={handleSubmit(handleValid)}>
                <TextField
                    {...register('test')}
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                />
                <button type="submit">Button</button>
            </form>
        </div>
    );
};

export default MaterialUIPage;
