import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import type { ModalSettingServiceRef } from "@/_Modals/ModalSettingService";
import { ModalSettingService } from "@/_Modals/ModalSettingService";
import { ButtonsAction } from "@/components/ButtonsAction";
import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./ServicesSetting.module.scss";

const cx = cnBind.bind(styles);
type ServicesSettingProps = {
    id: string;
};
export const ServicesSetting = ({ id }: ServicesSettingProps) => {
    const href = useNavigate();
    const { data } = useAllServicesQuery();
    const modalRef = useRef<ModalSettingServiceRef>(null);

    const listData = useMemo(() => data || [], [data]);
    const filterListData = useMemo(
        () => listData.filter((el) => el?.id?.toString() === id)[0].services,
        [listData, id],
    );

    const [isOpenModalSettingService, openCreateModal, closeModalSettingService] =
        useBooleanState(false);
    const [createModalType, setCreateModalType] = useState<"create" | "edit">("create");

    const handleCreateModal = () => {
        openCreateModal();
        setCreateModalType("create");
        modalRef.current?.setFormValues({
            id,
        });
    };

    const handleEditModal = (id?: string) => {
        const payload = filterListData.find((el) => el.id === id);
        openCreateModal();
        setCreateModalType("edit");
        modalRef.current?.setFormValues({
            price: payload?.priceMin?.toString() || "",
            description: "",
            caption: payload?.name || "",
            time: payload?.time?.toString() || "",
            id: payload?.id || "",
            serviceId: id || "",
        });
    };

    const handleCloseCreateModal = () => {
        closeModalSettingService();
        setCreateModalType("create");
        modalRef.current?.clearValues();
    };

    const handleCloseToBack = () => {
        closeModalSettingService();
        setCreateModalType("create");
        modalRef.current?.clearValues();
        href(`${ROUTES.SETTING}/services`);
    };

    return (
        <div className={cx("wrapper", "container")}>
            {filterListData.map((el) => (
                <div key={el.id} className={cx("section")}>
                    <h2 className={cx("title")}>{el.name}</h2>
                    <div className={cx("list", isOpenModalSettingService && "active")}>
                        {filterListData.map((card) => (
                            <ServiceCard
                                isChoose={false}
                                onClick={handleEditModal}
                                key={card.id}
                                currencyShortTitle="rub."
                                {...card}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <ModalSettingService
                ref={modalRef}
                isOpen={isOpenModalSettingService}
                onClose={handleCloseCreateModal}
                onSubmit={() => {}}
                type={createModalType}
                isLoading={false}
            />
            <ButtonsAction
                isOpen={!isOpenModalSettingService}
                onSubmit={handleCreateModal}
                onClose={handleCloseToBack}
                btnLabel={["Добавить услугу", "Назад к категориям"]}
            />
        </div>
    );
};
