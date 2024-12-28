import { useEffect, useMemo, useRef, useState } from "react";
import cnBind from "classnames/bind";
import { motion } from "framer-motion";

import { ConfirmModal, useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import slider3 from "@/shared/assets/Slide01 (2).png";
import slider2 from "@/shared/assets/Slide02 (2).png";
import slider1 from "@/shared/assets/Slide03.png";
import { useBooleanState } from "@/shared/hooks";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick.tsx";
import { Carousel } from "@/shared/ui/_Carousel";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./UploadImage.module.scss";

const cx = cnBind.bind(styles);
type UploadImageProps = {
    data?: string[];
    onChange?: (value: File[]) => void;
    onRemove?: (id: string) => void;
    onMainSlide?: (id: string) => void;
    classNameImage?: string;
};
const buttons = [
    { y: -60, name: "photo" },
    { y: -120, name: "remove" },
    { y: -85, x: -60, name: "image-btn" },
];
export const UploadImage = ({
    data,
    onChange,
    onRemove,
    onMainSlide,
    classNameImage,
}: UploadImageProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();

    const [listImages, setListImages] = useState<string[]>([slider1, slider2, slider3]);
    const [isActiveBtnEdit, , closeIsActiveBtnEdit, toggleIsActiveBtnEdit] = useBooleanState(false);
    const containerRef = useOutsideClick(closeIsActiveBtnEdit);
    const [_, setFile] = useState<File | null>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFile(file);
            onChange?.([file]);
        }
    };

    const handleFileInputClick = () => fileInputRef?.current?.click();
    const handleOnMainSlide = (id: string) => onMainSlide?.(id);
    const handleOnRemove = (id: string) => {
        return withConfirm({
            message: "Удалить фотографию?",
            onSubmit: () => onRemove?.(id),
            onClose: () => undefined,
        });
    };
    const handleFunctions = {
        photo: handleFileInputClick,
        remove: () => handleOnRemove(listImages[0]),
        "image-btn": () => handleOnMainSlide(listImages[0]),
    };
    const handleChooseFunction = (type: "photo" | "remove" | "image-btn") =>
        handleFunctions[type]?.();

    useEffect(() => {
        if (data) {
            setListImages(data);
        }
    }, [data]);

    const settingBtn = useMemo(
        () => (listImages.length <= 1 ? buttons.slice(0, 1) : buttons),
        [listImages.length],
    );

    return (
        <div ref={containerRef} className={cx("upload-image")}>
            <Carousel classNameImage={classNameImage} value={listImages} />
            <div className={cx("list-btns")}>
                <div onClick={toggleIsActiveBtnEdit} className={cx("btn-edit", "main-btn")}>
                    <SvgIcon
                        name="threeDots"
                        className={cx("btn-icon", isActiveBtnEdit && "active")}
                    />
                </div>
                {settingBtn.map((btn, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 0, x: 0 }}
                        animate={{
                            opacity: isActiveBtnEdit ? 1 : 0,
                            y: isActiveBtnEdit ? btn.y : 0,
                            x: isActiveBtnEdit ? btn.x : 0,
                        }}
                        transition={{ delay: isActiveBtnEdit ? index * 0.1 : 0, duration: 0.5 }}
                        className={cx("btn-edit", "secondary-btn", btn.name)}
                        onClick={() =>
                            handleChooseFunction(btn.name as "photo" | "remove" | "image-btn")
                        }
                    >
                        {btn.name === "photo" && (
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                                style={{ display: "none" }}
                            />
                        )}
                        <SvgIcon name={btn.name} className={cx("btn-icon")} />
                    </motion.div>
                ))}
            </div>
            <ConfirmModal {...confirmModalProps} />
        </div>
    );
};
