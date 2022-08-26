import { useController } from 'react-hook-form';

const Radio = ({ control, name, ...props }) => {
    const { field } = useController({
        name,
        control,
        defaultValue: '',
    });

    return (
        <label className="relative block w-4 h-4 rounded-full border-2 border-primary">
            <input
                id={name + props.value}
                {...field}
                {...props}
                className="hidden"
                type="radio"
            />
            {field.value === props.value && (
                <span className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-2 h-2 bg-primary rounded-full"></span>
            )}
        </label>
    );
};

export default Radio;
