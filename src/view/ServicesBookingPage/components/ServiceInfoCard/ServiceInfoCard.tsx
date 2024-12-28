import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ServiceInfoCard.module.scss";

const cx = cnBind.bind(styles);
type ServiceInfoCardProps = {
    id?: string;
    name?: string;
    post?: string;
    url?: string;
};
export const ServiceInfoCard = ({ id, post, name, url = ROUTES.SERVICE }: ServiceInfoCardProps) => {
    return (
        <Link to={`${url}/${id}`} className={cx("card")}>
            <div className={cx("info")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{post}</span>
            </div>
            <SvgIcon name="ArrowRight" className={cx("arrow")} />
        </Link>
    );
};
