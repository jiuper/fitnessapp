import { useMemo } from "react";
import cnBind from "classnames/bind";

import type { GetAllServicesApiResponse } from "@/entities/services/api/getAllServicesApi/types.ts";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";

import styles from "./ServicesBookingPage.module.scss";

const cx = cnBind.bind(styles);

type ServiceInfoCardProps = {
    data: GetAllServicesApiResponse;
};
export const ServicesBookingPage = ({ data }: ServiceInfoCardProps) => {
    const filterList = useMemo(() => data.slice(-4), [data]);

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Тип тренеровки</h2>
            <div className={cx("list")}>
                {filterList.map((el) => (
                    <ServiceInfoCard key={el.id} {...el} />
                ))}
            </div>
        </div>
    );
};
