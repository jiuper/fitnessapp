import cnBind from "classnames/bind";
import { Skeleton } from "primereact/skeleton";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./MasterInfoCard.module.scss";

const cx = cnBind.bind(styles);

export const MasterInfoCardSkeleton = () => {
    return (
        <div className={cx("card")}>
            <Skeleton height="4rem" width="5rem" />
            <div className={cx("info")}>
                <Skeleton width="10rem" height="1rem" />
                <Skeleton width="10rem" height="1rem" />
            </div>
            <SvgIcon name="ArrowRight" className={cx("arrow")} />
        </div>
    );
};
