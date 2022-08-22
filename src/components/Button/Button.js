import PropTypes from 'prop-types';
import { useMemo } from 'react';
import classNames from '~/utils/classNames';
import { Link } from 'react-router-dom';

const Button = ({
    to,
    href,
    type = 'button',
    children,
    primary,
    secondary,
    secondaryText,
    error,
    leftIcon,
    outline,
    rounded,
    small,
    withFull,
    disabled,
    isLoading,
    className = '',
    ...props
}) => {
    let Component = 'button';
    const rest = {};
    const Icon = leftIcon;
    const styles = useMemo(() => {
        let styles = [];

        if (small) styles.push('py-[9px] px-[13px] h-[38px] text-sm');
        else styles.push('py-[13px] px-[26px] h-[50px] text-base');

        if (primary) styles.push('bg-primary text-white');
        else if (secondary) styles.push('bg-secondary text-white');
        else if (secondaryText) styles.push('bg-[#EEEAFD] text-secondary');
        else if (error) styles.push('bg-red-soft text-error');
        else styles.push('text-2 dark:text-white');

        if (withFull) styles.push('w-full');
        else styles.push('w-fit');

        if (outline)
            styles.push('border border-stroke dark:border-dark-stroke');

        if (rounded) styles.push('rounded-full');
        else styles.push('rounded-[10px]');

        return classNames(...styles);
    }, [
        error,
        outline,
        primary,
        rounded,
        secondary,
        secondaryText,
        small,
        withFull,
    ]);

    if (to) {
        rest.to = to;
        Component = Link;
    } else if (href) {
        rest.href = href;
        Component = 'a';
    }

    if (disabled || isLoading) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) delete props[key];
        });
    }

    return (
        <Component
            type={type}
            disabled={disabled}
            className={classNames(
                'outline-none flex justify-center items-center gap-[10px] font-semibold transition-all',
                styles,
                disabled || isLoading ? 'opacity-60 relative' : '',
                className,
            )}
            {...rest}
            {...props}
        >
            {leftIcon && <Icon className={isLoading ? 'opacity-0' : ''} />}
            <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
            {isLoading && (
                <div
                    className={classNames(
                        'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4',
                        small ? 'w-[26px] h-[26px]' : 'w-[38px] h-[38px]',
                    )}
                >
                    <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </Component>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    secondaryText: PropTypes.bool,
    error: PropTypes.bool,
    leftIcon: PropTypes.any,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    withFull: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
