import cnBind from "classnames/bind";
import { Skeleton } from "primereact/skeleton";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ServiceInfoCard.module.scss";

const cx = cnBind.bind(styles);

export const ServiceCardSkeleton = () => {
    return (
        <div className={cx("card")}>
            <div className={cx("info")}>
                <Skeleton width="10rem" height="2rem" />
            </div>
            <SvgIcon name="ArrowRight" className={cx("arrow")} />
        </div>
    );
};
