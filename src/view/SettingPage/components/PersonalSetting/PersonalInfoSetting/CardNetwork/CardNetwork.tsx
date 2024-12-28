import { useState } from "react";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ConfirmModal } from "@/_Modals/ConfirmModal";
import { useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./CardNetwork.module.scss";

const cx = cnBind.bind(styles);
type CardNetworkProps = {
    title?: string;
    icon?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const isValidUrl = (url: string): boolean => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    return regex.test(url);
};
export const CardNetwork = ({ title = "Telegram", icon, onChange }: CardNetworkProps) => {
    const { withConfirm, modalProps } = useConfirmModal();
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        e.target.value === "" ? setIsValid(true) : setIsValid(isValidUrl(e.target.value));
        onChange?.(e);
    };
    const handleClick = () => setActive(!active);

    const handleDeactivate = () => {
        withConfirm({
            message: "Деактивировать адрес?",
            onSubmit: () => setActive(false),
            onClose: () => undefined,
        });
    };

    return (
        <div className={cx("card-network")}>
            {icon && <Avatar size={40} className={cx("icon")} src={icon} alt={title} />}
            {active ? (
                <div className={cx("input-wrapper")}>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className={cx("input")}
                        placeholder="URL"
                    />
                    <span className={cx("error", !isValid && "active")}>Несуществующий URL*</span>
                </div>
            ) : (
                <span className={cx("text")}>{title}</span>
            )}

            <div className={cx("icons")}>
                {active && value !== "" && (
                    <div onClick={handleClick} className={cx("icon-container", "pencil")}>
                        <SvgIcon name="Checked" className={cx("icon", "pencil-icon")} />
                    </div>
                )}
                {!active && (
                    <div onClick={handleClick} className={cx("icon-container", "pencil")}>
                        <SvgIcon name="pencil" className={cx("icon", "pencil-icon")} />
                    </div>
                )}
                <div
                    onClick={active ? handleClick : handleDeactivate}
                    className={cx("icon-container", "ban")}
                >
                    <SvgIcon name={active ? "close" : "ban"} className={cx("icon", "ban-icon")} />
                </div>
            </div>
            <ConfirmModal {...modalProps} />
        </div>
    );
};
