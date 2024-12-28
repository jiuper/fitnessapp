import { useNavigate } from "react-router";
import { Button } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ROUTES } from "@/shared/const/Routes.ts";

import styles from "./ReferralBlock.module.scss";

const cx = cnBind.bind(styles);
type ReferralBlockProps = {
    countCredits?: number;
    currencyShortTitle?: string;
};
export const ReferralBlock = ({ countCredits = 10, currencyShortTitle }: ReferralBlockProps) => {
    const href = useNavigate();

    return (
        <div className={cx("wrapper")}>
            <div className={cx("referral-block")}>
                <span className={cx("referral-title")}>Ваш баланс</span>
                <span className={cx("referral-value")}>{`${countCredits} ${currencyShortTitle}`}</span>
            </div>
            <Button onClick={() => href(ROUTES.BONUS)} className={cx("referral-button")}>
                Заработать бонусы
            </Button>
        </div>
    );
};
