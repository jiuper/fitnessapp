import { useState } from "react";

import { useBooleanState } from "@/shared/hooks/useBooleanState";

type usePopupHookType<T> = [boolean, () => void, () => void, (data: T) => void, T | undefined];

export const usePopup = <T>(): usePopupHookType<T> => {
    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const [data, setData] = useState<T>();
    const handleOnModal = (data: T) => {
        onClose();
        setData(data);
    };

    return [isOpen, onOpen, onClose, handleOnModal, data];
};
