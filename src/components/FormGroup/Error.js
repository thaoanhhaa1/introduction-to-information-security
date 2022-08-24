import { classNames } from '~/utils';

const Error = ({ children, className }) => {
    return (
        <p className={classNames('mt-2 text-sm text-error', className)}>
            {children}
        </p>
    );
};

export default Error;
