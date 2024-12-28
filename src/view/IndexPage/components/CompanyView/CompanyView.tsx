import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import slider3 from "@/shared/assets/Slide01 (2).png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Carousel } from "@/shared/ui/_Carousel";
import { CardGym } from "@/view/IndexPage/components/ClientView/components/CardGym";
import { CardStaff } from "@/view/IndexPage/components/ClientView/components/CardStaff";
import { ReferralBlock } from "@/view/IndexPage/components/ReferralBlock";

import styles from "./CompanyView.module.scss";

const cx = cnBind.bind(styles);
type IndexPageProps = {
    listGym: GetCompanyDto[];
    listStaff: GetMasterDto[];
};
export const CompanyView = ({ listGym, listStaff }: IndexPageProps) => {
    const href = useNavigate();

    return (
        <div className={cx("bg-wrapper")}>
            <div className={cx("main-banner")}>
                <Carousel value={[slider3]} />
            </div>
            <div className={cx("wrapper", "container")}>
                <div className={cx("gym-list")}>
                    <div className={cx("title-gym")}>
                        <span>Залы</span>
                    </div>
                    <div className={cx("list")}>
                        {listGym.map((el) => (
                            <CardGym key={el.id} onClick={() => href(`client/${el.id}`)} {...el} />
                        ))}
                    </div>
                </div>
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
                <ReferralBlock countCredits={10} currencyShortTitle="руб." />
            </div>
        </div>
    );
};
