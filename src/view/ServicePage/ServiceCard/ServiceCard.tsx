import cnBind from "classnames/bind";

import notFound from "@/shared/assets/images/Empty-image-icon.png";
import { ButtonIcon } from "@/shared/ui/_ButtonIcon";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ServiceCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceCardProps = {
    id?: string;
    name?: string;
    image?: string;
    time?: string | number;
    priceMin?: number;
    priceMax?: number;
    onClick?: (id?: string, flag?: boolean) => void;
    isChoose?: boolean;
    currencyShortTitle?: string;
    percent?: number;
    className?: string;
};
export const ServiceCard = ({
    name,
    time,
    image,
    onClick,
    id,
    isChoose,
    percent,
    className,
}: ServiceCardProps) => {
    return (
        <div className={cx("card", className)}>
            <div className={cx("header")} onClick={() => onClick?.(id, true)}>
                {percent && <span className={cx("subtitle-sale")}>{`${percent} %.`}</span>}
                <img className={cx("image")} alt="Card" src={image || notFound} />
                {time && <span className={cx("subtitle")}>{`${time} мин.`}</span>}
            </div>
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <span className={cx("title")}>{name}</span>
                </div>
                {time && (
                    <ButtonIcon
                        onClick={() => onClick?.(id)}
                        color={isChoose ? "orange" : "empty"}
                        className={cx("button", { isChoose })}
                        icon={<SvgIcon name={isChoose ? "Checked" : "plus"} />}
                    />
                )}
            </div>
        </div>
    );
};
