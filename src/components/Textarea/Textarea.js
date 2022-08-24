import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { classNames } from '~/utils';

const MIN_TEXTAREA_HEIGHT = 104;

const Textarea = (
    { invalid, name, setValueForm, className, ...props },
    ref,
) => {
    const [value, setValue] = useState();
    const textareaRef = useRef();

    const handleChange = (e) => {
        setValueForm(name, e.target.value);
        setValue(e.target.value);
    };

    useImperativeHandle(
        ref,
        () => ({
            handleClear: () => {
                setValueForm(name, '');
                setValue('');
            },
        }),
        [name, setValueForm],
    );

    useEffect(() => {
        const element = textareaRef.current;

        if (!element) return;

        Array.prototype.forEach.call(element, function (elem) {
            elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
        });
    });

    useEffect(() => {
        const element = textareaRef.current;

        if (!element) return;

        element.style.height = 'inherit';
        element.style.height = `${Math.max(
            element.scrollHeight,
            MIN_TEXTAREA_HEIGHT,
        )}px`;
    }, [value]);

    return (
        <textarea
            value={value}
            className={classNames(
                'py-[15px] px-[25px] min-h-[104px] w-full border border-[#F1F1F3] font-medium text-text-1 placeholder:text-text-4 outline-none rounded-[10px] resize-none',
                invalid ? 'border-error placeholder:text-error' : '',
                className,
            )}
            ref={textareaRef}
            onChange={handleChange}
            {...props}
        ></textarea>
    );
};

export default forwardRef(Textarea);
