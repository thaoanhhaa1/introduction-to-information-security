import {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useState,
} from 'react';
import { v4 } from 'uuid';
import config from '~/config';
import { classNames, createMatrix } from '~/utils';

const GridInput = ({ name, className, setValue, count = 3 }, ref) => {
    const [matrix, setMatrix] = useState(() => createMatrix(count, count));
    const handleChange = (e, i, j) => {
        matrix[i][j] = e.target.value;
        setMatrix(matrix);
        setValue(name, matrix);
    };

    useLayoutEffect(() => {
        setMatrix(() => createMatrix(count, count));
    }, [count]);

    useImperativeHandle(
        ref,
        () => ({
            handleClear: () => setMatrix(createMatrix(count, count)),
        }),
        [count],
    );

    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
            }}
            className={classNames(
                'w-fit grid gap-x-[6px] gap-y-[3px]',
                className,
            )}
        >
            {new Array(count * count).fill(0).map((item, index) => {
                const i = Math.floor(index / count);
                const j = index % count;

                return (
                    <input
                        placeholder={config.english[index % 24]}
                        title={`a[${i}, ${j}]`}
                        key={v4()}
                        className="text-right py-[2px] px-1 w-[55px] border border-gray-300 outline-none rounded-lg"
                        type="text"
                        value={matrix?.[i]?.[j]}
                        onChange={(e) => handleChange(e, i, j)}
                    />
                );
            })}
        </div>
    );
};

export default forwardRef(GridInput);
