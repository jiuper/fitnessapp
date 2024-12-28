import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export const useDebouncedValue = <T>(newValue: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(newValue);

    const handleSetDebouncedValue = useMemo(() => debounce((value: T) => setDebouncedValue(value), delay), [delay]);

    useEffect(() => {
        handleSetDebouncedValue(newValue);

        return () => {
            handleSetDebouncedValue.cancel();
        };
    }, [delay, handleSetDebouncedValue, newValue]);

    return debouncedValue;
};
