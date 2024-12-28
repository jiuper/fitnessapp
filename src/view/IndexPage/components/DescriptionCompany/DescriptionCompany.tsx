import cnBind from "classnames/bind";

import styles from "./DescriptionCompany.module.scss";

const cx = cnBind.bind(styles);
type DescriptionCompanyProps = {
    description?: string;
};
export const DescriptionCompany = ({ description }: DescriptionCompanyProps) => {
    return (
        <div className={cx("wrapper")}>
            <span className={cx("title")}>Описание</span>
            <p className={cx("description")}>{description}</p>
        </div>
    );
};
