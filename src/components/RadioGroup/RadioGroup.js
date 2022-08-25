import { v4 } from 'uuid';
import classNames from '~/utils/classNames';
import RadioItem from './RadioItem';

const RadioGroup = ({ control, radioList, name, className }) => {
    return (
        <div className={classNames('flex gap-4 flex-wrap', className)}>
            {radioList.map((radioItem) => (
                <RadioItem
                    key={v4()}
                    name={name}
                    control={control}
                    {...radioItem}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
