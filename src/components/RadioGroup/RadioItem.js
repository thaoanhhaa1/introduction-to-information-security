import Radio from '../Radio/Radio';

const RadioItem = ({ control, name, value, label }) => {
    return (
        <div className="flex gap-2 items-center">
            <Radio name={name} value={value} control={control} />
            <label className="font-medium text-text-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export default RadioItem;
