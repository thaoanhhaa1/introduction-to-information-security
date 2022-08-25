import { classNames } from '~/utils';

const Label = ({ htmlFor, children, className }) => {
    return (
        <label
            className={classNames(
                'cursor-pointer inline-block mb-1 font-medium text-text-2',
                className,
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};

export default Label;
