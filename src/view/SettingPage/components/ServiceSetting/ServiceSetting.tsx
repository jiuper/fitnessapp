import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import type { ModalSettingServiceRef } from "@/_Modals/ModalSettingService";
import { ButtonsAction } from "@/components/ButtonsAction";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { ServiceInfoCard } from "@/view/ServicesBookingPage/components/ServiceInfoCard";

import styles from "./ServiceSetting.module.scss";

const cx = cnBind.bind(styles);

export const ServiceSetting = () => {
    const href = useNavigate();
    const modalRef = useRef<ModalSettingServiceRef>(null);

    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);
    const [isOpenModalSettingService, _, closeModalSettingService] = useBooleanState(false);
    const handleCloseToBack = () => {
        closeModalSettingService();
        modalRef.current?.clearValues();
        href(`${ROUTES.SETTING}`);
    };

    return (
        <div className={cx("service-setting")}>
            <div className={cx("wrapper", "container")}>
                <h2 className={cx("title")}>Услуги</h2>
                <div className={cx("list")}>
                    {listData.map((el) => (
                        <ServiceInfoCard
                            url={`${ROUTES.SETTING}/serviceDetail`}
                            key={el.id}
                            {...el}
                        />
                    ))}
                </div>
            </div>

            <ButtonsAction
                isOpen={!isOpenModalSettingService}
                onSubmit={() => {}}
                onClose={handleCloseToBack}
                btnLabel={["Добавить категорию", "К настройкам"]}
            />
        </div>
    );
};
