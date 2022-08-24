import { useState } from 'react';

export default function useToggle(initialValue) {
    const [toggle, setToggle] = useState(!!initialValue);

    const handleToggle = () => setToggle((toggle) => !toggle);

    return [toggle, handleToggle];
}
