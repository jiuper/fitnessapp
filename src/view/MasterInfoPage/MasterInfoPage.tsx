import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalBookingService } from "@/_Modals/ModalBookingService";
import { ModalSocialNetworks } from "@/_Modals/ModalSocialNetworks";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import avatar from "@/shared/assets/Avatar.png";
import def from "@/shared/assets/Image (7).png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./MasterInfoPage.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoPageProps = {
    data: GetMasterDto;
    masterId?: string;
    listService: GetCategoryWithServiceDto[];
};
export const MasterInfoPage = ({ data, masterId, listService }: MasterInfoPageProps) => {
    const { handleAddMasterBooking } = useClientContextMutate();
    const href = useNavigate();

    const [id, setId] = useState<string>("");

    const [isOpenModalNetWork, onOpenModalNetWork, onCloseModalNetWork] = useBooleanState(false);
    const [isOpenModalBooking, onOpenModalBooking, onCloseModalBooking] = useBooleanState(false);

    const onBooking = (idx: string) => {
        if (id === idx) return setId("");
        setId(idx);
        onOpenModalBooking();
    };

    const onRecord = () => {
        handleAddMasterBooking(masterId || "");
        href(`${ROUTES.TIMESBOOKING}/${data.id}`);
    };

    useEffect(() => {
        if (id === "") onCloseModalBooking();
    }, [id, onCloseModalBooking]);

    const listLinkTop = [
        { name: "Клиенты", onClick: () => onOpenModalNetWork(), icon: "image" },
        { name: "Отзывы", onClick: () => href(ROUTES.FEEDBACK), icon: "star-rate" },
        { name: "Связаться", onClick: () => onOpenModalNetWork(), icon: "message" },
    ];
    const list = ["Силовая показатели", "Выносливость", "Рельефное тело", "Кардио тренировки"];

    return (
        <div className={cx("master-info")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={avatar} />
                        <Badge className={cx("badge")} type="number">
                            3.9
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{data?.name}</span>
                        <span className={cx("post")}>{data?.gym?.name}</span>
                        <span className={cx("post")}>{data?.gym?.address}</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("list-serv")}>
                        {list.map((el, i) => (
                            <div key={i} className={cx("title")}>
                                {el}
                            </div>
                        ))}
                    </div>
                    <div className={cx("links")}>
                        <LinkGroup listLink={listLinkTop} />
                    </div>

                    <div className={cx("list-services", isOpenModalBooking && "active")}>
                        <div className={cx("title")}>
                            <span>Услуги</span>
                        </div>
                        <div className={cx("list")}>
                            {listService.map((el, i) => (
                                <ServiceCard
                                    isChoose={id === el.id}
                                    className={cx("service-card")}
                                    key={i}
                                    name={el.name}
                                    image={def}
                                    onClick={() => onBooking(el.id || "")}
                                    time={60}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalSocialNetworks
                listHrefNetworks={[]}
                isOpen={isOpenModalNetWork}
                onClose={onCloseModalNetWork}
            />
            <ModalBookingService
                price={0}
                time={0}
                count={0}
                isOpen={isOpenModalBooking}
                currencyShortTitle="rub."
                onClick={onRecord}
                title="После выберите тренера"
                label="К дате и времени"
            />
        </div>
    );
};
