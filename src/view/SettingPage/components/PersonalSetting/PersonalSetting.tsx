import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import type { ModalSettingServiceRef } from "@/_Modals/ModalSettingService";
import { ButtonsAction } from "@/components/ButtonsAction";
import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";

import styles from "./PersonalSetting.module.scss";

const cx = cnBind.bind(styles);
export const PersonalSetting = () => {
    const href = useNavigate();
    const modalRef = useRef<ModalSettingServiceRef>(null);
    const { data: listMaster } = useAllMastersQuery(true);

    const listMasterData = useMemo(() => listMaster || [], [listMaster]);
    const [isOpenModalSettingService, _, closeModalSettingService] = useBooleanState(false);
    const handleCloseToBack = () => {
        closeModalSettingService();
        modalRef.current?.clearValues();
        href(`${ROUTES.SETTING}`);
    };

    const handleOnMore = (id?: string) => {
        if (id) {
            href(`${ROUTES.SETTING}/personalDetail/${id}`);
        }
    };

    return (
        <div className={cx("personal-setting")}>
            <div className={cx("wrapper", "container")}>
                <h2 className={cx("title")}>Мастера</h2>

                <div className={cx("list")}>
                    {listMasterData.map((el) => (
                        <MasterInfoCard onClick={handleOnMore} key={el.id} {...el} />
                    ))}
                </div>
            </div>
            <ButtonsAction
                isOpen={!isOpenModalSettingService}
                onSubmit={() => href(`${ROUTES.SETTING}/personalAdd`)}
                onClose={handleCloseToBack}
                btnLabel={["Добавить сотрудника", "К настройкам"]}
            />
        </div>
    );
};
