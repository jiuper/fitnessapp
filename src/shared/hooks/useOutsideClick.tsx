import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void): MutableRefObject<HTMLDivElement | null> => {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);

    return ref;
};
