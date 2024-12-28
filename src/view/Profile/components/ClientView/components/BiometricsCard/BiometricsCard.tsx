import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./BiometricsCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceInfoCardProps = {
    name?: string;
    onClick?: () => void;
};
export const BiometricsCard = ({ name, onClick }: ServiceInfoCardProps) => {
    return (
        <div onClick={onClick} className={cx("card")}>
            <div className={cx("info")}>
                <span className={cx("name")}>{name}</span>
            </div>
            <SvgIcon name="ArrowRight" className={cx("arrow")} />
        </div>
    );
};
