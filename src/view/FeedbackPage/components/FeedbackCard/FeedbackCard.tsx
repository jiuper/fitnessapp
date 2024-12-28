import cnBind from "classnames/bind";

import def from "@/shared/assets/images/Empty-image-icon.png";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./FeedbackCard.module.scss";

const cx = cnBind.bind(styles);
export type FeedbackCardProps = {
    id: string;
    name: string;
    service: string;
    description?: string;
    rating: number;
    dateTime: string;
    image?: string;
};
export const FeedbackCard = ({ dateTime, description, service, name, rating, image }: FeedbackCardProps) => {
    return (
        <div className={cx("feedback-card")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar-container")}>
                        <img className={cx("avatar")} src={image || def} alt="avatar" />
                    </div>
                    <div className={cx("short-info")}>
                        <div className={cx("datetime")}>
                            <span>{name}</span>
                            <span>{dateTime}</span>
                        </div>
                        <span className={cx("service")}>{service}</span>
                    </div>
                    <div className={cx("rating")}>
                        <span>{rating}</span>
                        <SvgIcon name="rating" />
                    </div>
                </div>
                {description && (
                    <div className={cx("description")}>
                        <p className={cx("text")}>{description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
