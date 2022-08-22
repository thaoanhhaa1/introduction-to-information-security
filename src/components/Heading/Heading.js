import classNames from '~/utils/classNames';

const Heading = ({ children, className }) => {
    return (
        <h1 className={classNames('font-semibold text-2xl', className)}>
            {children}
        </h1>
    );
};

export default Heading;
