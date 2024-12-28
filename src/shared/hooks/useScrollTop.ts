import { useEffect, useState } from "react";

import { useBooleanState } from "@/shared/hooks/useBooleanState";

export const useScrollTop = (): [() => void, boolean, number] => {
    const [value, setTrue, setFalse] = useBooleanState(false);
    const [cur, setCur] = useState<number>(0);

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            // eslint-disable-next-line no-unused-expressions
            window.scrollY <= 100 ? setFalse() : setTrue();
            setCur(window.scrollY);
        });
    }, [setFalse, setTrue]);

    return [handleScrollTop, value, cur];
};
