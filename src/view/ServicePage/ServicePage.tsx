import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalDetailedService } from "@/_Modals/ModalDetailedService";
import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBookingService } from "@/shared/hooks/useBookingService.ts";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./ServicePage.module.scss";

const cx = cnBind.bind(styles);
type ServicePageProps = {
    data: GetCategoryWithServiceDto[];
};
export const ServicePage = ({ data }: ServicePageProps) => {
    const href = useNavigate();

    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterSearchListData = useMemo(
        () =>
            data.length !== 0
                ? data[0].services.filter((el) =>
                      el.name?.toLowerCase().includes(searchValue?.toLowerCase() || ""),
                  )
                : [],
        [data, searchValue],
    );

    const {
        servicesId,
        price,
        time,
        service,
        isOpenModalBookingService,
        handleOpenModalService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalDetailsService,
    } = useBookingService(filterSearchListData);

    const onRecord = () => href(`${ROUTES.MASTERFILTER}`);

    return (
        <div className={cx("wrapper", "container")}>
            {data.map((el) => (
                <div key={el.id} className={cx("section")}>
                    <h2 className={cx("title")}>{el.name}</h2>
                    <InputSearch value={searchValue} onChange={setSearchValue} />
                    <div className={cx("list", isOpenModalBookingService && "active")}>
                        {filterSearchListData.length !== 0 ? (
                            filterSearchListData.map((card) => (
                                <ServiceCard
                                    isChoose={servicesId.includes(card.id || "")}
                                    onClick={handleOpenModalService}
                                    key={card.id}
                                    currencyShortTitle="rub."
                                    {...card}
                                />
                            ))
                        ) : (
                            <div className={cx("not-found")}>Такой услуги нет</div>
                        )}
                    </div>
                </div>
            ))}
            <ModalDetailedService
                {...service}
                isOpen={isOpenModalService}
                onClick={handleOpenModalDetailsService}
                onClose={onCloseModalService}
                currencyShortTitle="rub."
            />
            <ModalBookingService
                price={price}
                time={time}
                count={servicesId.length}
                isOpen={isOpenModalBookingService}
                onClick={onRecord}
                title="Услуги можно заказать находясь внутри категории"
                currencyShortTitle="rub."
                label="К выбору мастера"
            />
        </div>
    );
};
