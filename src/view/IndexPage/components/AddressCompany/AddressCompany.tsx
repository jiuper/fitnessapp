import type { JSX } from "react";
import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./AdressCompany.module.scss";

const cx = cnBind.bind(styles);
type AddressCompanyProps = {
    city?: string;
    address?: string;
    map?: { lat?: number; lon?: number };
    className?: string;
    dateTime?: JSX.Element;
};
export const AddressCompany = ({ city, address, className, dateTime }: AddressCompanyProps) => {
    return (
        <div className={cx(className, "address-company")}>
            <div className={cx("top")}>
                <div className={cx("info")}>
                    <span className={cx("city")}>{city}</span>
                    <div className={cx("map")}>
                        <SvgIcon name="place" />
                        <span className={cx("address")}>{address}</span>
                    </div>
                </div>
            </div>

            {dateTime ? <div className={cx("datetime")}>{dateTime}</div> : null}
        </div>
    );
};
