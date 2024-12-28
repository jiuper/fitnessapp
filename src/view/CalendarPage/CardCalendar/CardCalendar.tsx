import { useNavigate } from "react-router";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ModalFeedBack } from "@/_Modals/ModalFeedBack";
import { ROUTES } from "@/shared/const/Routes.ts";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/_Button";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./CardCalendar.module.scss";

const cx = cnBind.bind(styles);
type CardCalendarProps = {
    caption?: string;
    genPrice?: number;
    countServices?: number;
    masterInfo?: { image?: string; name?: string };
    address?: string;
    currencyShortTitle?: string;
    id?: string;
    isFeedback?: boolean;
};
export const CardCalendar = ({
    address,
    caption,
    countServices,
    genPrice,
    masterInfo,
    currencyShortTitle,
    id,
    isFeedback = false,
}: CardCalendarProps) => {
    const href = useNavigate();
    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const onClickHandler = () => {
        href(`${ROUTES.RECORD}/${id}`);
    };

    return (
        <div
            onClick={!isFeedback ? onClickHandler : () => {}}
            className={cx("card-calendar", { isFeedback })}
        >
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <span className={cx("caption")}>{caption}</span>
                    <span className={cx("gen-price")}>{`${genPrice} ${currencyShortTitle}`}</span>
                </div>
                <div className={cx("body")}>
                    <div className={cx("count-services")}>
                        <span>+{countServices}</span>
                        <SvgIcon name="sparkles" className={cx("icon")} />
                    </div>

                    <span className={cx("gen-price")}>{`${genPrice} ${currencyShortTitle}`}</span>
                </div>
                <div className={cx("footer")}>
                    <div className={cx("avatar")}>
                        <Avatar src={masterInfo?.image} size={20} />
                        <span>{masterInfo?.name}</span>
                    </div>
                    <div className={cx("address")}>
                        <SvgIcon name="place" className={cx("icon")} />
                        <span>{address}</span>
                    </div>
                </div>
                {isFeedback && (
                    <Button label="Оставить отзыв" className={cx("button")} onClick={onOpen} />
                )}
            </div>
            <ModalFeedBack
                currencyShortTitle={currencyShortTitle}
                isOpen={isOpen}
                onClose={onClose}
                service={{ name: caption || "", priceMin: genPrice || 0, id: id || "" }}
            />
        </div>
    );
};
