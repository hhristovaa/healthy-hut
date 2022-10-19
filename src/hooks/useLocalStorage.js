import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initial) => {
    const [val, setVal] = useState(() => {
        const storedVal = localStorage.getItem(key);

        return storedVal ? JSON.parse(storedVal) : initial;

    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val));
    }, [key, val])

    return [val, setVal];

}
