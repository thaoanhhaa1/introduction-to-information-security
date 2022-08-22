import { v4 } from 'uuid';
import classNames from '~/utils/classNames';
import RadioItem from './RadioItem';

const RadioGroup = ({ control, radioList, name, className }) => {
    return (
        <div className={classNames('flex gap-4', className)}>
            {radioList.map((radioItem) => (
                <RadioItem
                    key={v4()}
                    name={name}
                    value={radioItem.value}
                    control={control}
                    label={radioItem.label}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
