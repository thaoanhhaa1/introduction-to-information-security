import { useController } from 'react-hook-form';

const Input = ({ placeholder, control, name, ...props }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });

    return (
        <input
            id={name}
            placeholder={placeholder}
            className="w-full py-[15px] px-[25px] rounded-[10px] border border-[#F1F1F3] font-medium text-text-1 placeholder:text-text-4 outline-none"
            {...field}
            {...props}
        />
    );
};

export default Input;
