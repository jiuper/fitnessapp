import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./LinkGroup.module.scss";

const cx = cnBind.bind(styles);
type LinkGroupProps = {
    listLink: { name: string; href?: string; icon: string; onClick?: () => void }[];
};
export const LinkGroup = ({ listLink }: LinkGroupProps) => {
    const href = useNavigate();

    return (
        <div className={cx("links")}>
            {listLink.map((item, i) => (
                <div key={i} className={cx("link")} onClick={item.href ? () => href(item.href || "") : item.onClick}>
                    <div className={cx("link-container")}>
                        <SvgIcon className={cx("icon")} name={item.icon} />
                        <span>{item.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
