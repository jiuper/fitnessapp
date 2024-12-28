import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { InputSearch } from "@/shared/ui/_InputSearch";
import { MasterInfoCard } from "@/view/MasterBookingPage/components/MasterInfoCard";
import { MasterInfoCardSkeleton } from "@/view/MasterBookingPage/components/MasterInfoCard/MasterInfoCardSkeleton.tsx";

import styles from "./MasterBookingPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoCardProps = {
    data: GetMasterDto[];
    listGym?: GetCompanyDto[];
    isPending?: boolean;
    isServices?: boolean;
    servicesId: string[];
    addMasterBooking?: (masterId: string) => void;
};
export const MasterBookingPage = ({
    data,
    isPending,
    isServices,
    addMasterBooking,
    listGym,
}: MasterInfoCardProps) => {
    const href = useNavigate();
    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const filterListData = useMemo(
        () => data.filter((el) => el.name.toLowerCase().includes(searchValue?.toLowerCase() || "")),
        [data, searchValue],
    );
    const [dropdownValue, setDropDownValue] = useState<number>(10);
    const handleDropdownChange = (val: number) => setDropDownValue(val);
    const onRecord = (id?: string) => {
        if (!isServices && id) href(`${ROUTES.MASTER}/${id}`);

        if (isServices && id) {
            addMasterBooking?.(id);
            href(`${ROUTES.TIMESBOOKING}/${id}`);
        }
    };

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Тренер</h2>
            <InputSearch value={searchValue} onChange={setSearchValue} />
            <Dropdown
                options={listGym}
                value={dropdownValue}
                optionLabel="name"
                onChange={(e) => handleDropdownChange(e.value as number)}
                placeholder="Выберите зал"
                className={cx("dropdown")}
            />
            <div className={cx("list")}>
                {!isPending ? (
                    filterListData.length !== 0 ? (
                        filterListData.map((el) => (
                            <MasterInfoCard onClick={onRecord} key={el.id} {...el} />
                        ))
                    ) : (
                        <div className={cx("not-found")}>Тренеров не найдено</div>
                    )
                ) : (
                    Array(10)
                        .fill("")
                        .map((_, i) => <MasterInfoCardSkeleton key={i} />)
                )}
            </div>
        </div>
    );
};
