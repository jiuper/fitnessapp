import { useEffect, useRef } from "react";

import { useBooleanState } from "./useBooleanState";

export const useModalWindow = () => {
    const [value, _, setFalse, toggleValue] = useBooleanState(false);
    const isRef = useRef<HTMLDivElement | null>(null);

    const handleToggleModalWindow = () => toggleValue();
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isRef.current && !isRef.current.contains(e.target as HTMLDivElement)) {
                setFalse();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setFalse]);

    return { value, handleToggleModalWindow, isRef };
};
