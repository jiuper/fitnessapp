import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import cnBind from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import def from "@/shared/assets/Image (7).png";
import slider3 from "@/shared/assets/Slide01 (2).png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Carousel } from "@/shared/ui/_Carousel";
import { CardStaff } from "@/view/IndexPage/components/ClientView/components/CardStaff";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import "swiper/css";

import styles from "./ClientView.module.scss";

const cx = cnBind.bind(styles);
type IndexPageProps = {
    listGym: GetCompanyDto[];
    listStaff: GetMasterDto[];
    listService: GetCategoryWithServiceDto[];
    id?: string;
};
export const ClientView = ({ listStaff, listGym, listService }: IndexPageProps) => {
    const href = useNavigate();
    const { id } = useParams();

    const listGymDataFilter = useMemo(
        () => listGym.filter((el) => el?.id === id)[0] || [],
        [listGym, id],
    );

    return (
        <div className={cx("bg-wrapper")}>
            <div className={cx("main-banner")}>
                <Carousel value={[slider3, slider3, slider3]} />
            </div>
            <div className={cx("wrapper", "container")}>
                <div className={cx("gym")}>
                    <span className={cx("title")}>{listGymDataFilter.address}</span>
                    <span className={cx("title")}>{listGymDataFilter?.schedule}</span>
                </div>
                <ReferralBlock countCredits={10} currencyShortTitle="руб." />
                <div className={cx("gym-list")}>
                    <div className={cx("title")}>
                        <span>Инструкторы {`(${listStaff.length})`}</span>
                        <span onClick={() => href(ROUTES.BOOKING)}>См. всех</span>
                    </div>
                    <div className={cx("list-staff")}>
                        <Swiper
                            slidesPerView={2.5}
                            slideToClickedSlide
                            spaceBetween={20}
                            speed={1000}
                            freeMode
                        >
                            {listStaff.map((el, i) => (
                                <SwiperSlide key={i}>
                                    <CardStaff
                                        onClick={() => href(`${ROUTES.MASTER}/${el.id}`)}
                                        {...el}
                                        gym={el.gym?.name}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className={cx("service-list")}>
                    <div className={cx("title")}>
                        <span>Услуги</span>
                    </div>
                    <div className={cx("list")}>
                        {listService &&
                            listService.map((el, i) => (
                                <ServiceCard
                                    className={cx("service-card")}
                                    key={i}
                                    name={el.name}
                                    image={def}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
