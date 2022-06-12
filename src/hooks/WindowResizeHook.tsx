import { useLayoutEffect, useState } from "react";
import _debounce from 'lodash.debounce';

export function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
        const updateSize = _debounce(() => setSize([window.innerWidth, window.innerHeight]), 100);
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}