import { useParams } from "react-router";
import cnBind from "classnames/bind";

import { DiscountBonus } from "@/view/BonusSystemPage/components/DiscountBonus";
import { FriendsBonus } from "@/view/BonusSystemPage/components/FriendsBonus";
import { MainBonus } from "@/view/BonusSystemPage/components/MainBonus";
import { RulesBonus } from "@/view/BonusSystemPage/components/RulesBonus";

import styles from "./BonusSystemPage.module.scss";

const cx = cnBind.bind(styles);
type FunctionType = "discount" | "friends" | "main" | "rules";
const componentMap = {
    discount: DiscountBonus,
    friends: FriendsBonus,
    main: MainBonus,
    rules: RulesBonus,
};
type BonusSystemPage = {};
export const BonusSystemPage = ({}: BonusSystemPage) => {
    const { url } = useParams<{ url?: string }>();
    const Component = url ? componentMap[url as FunctionType] : componentMap.main;

    return (
        <div className={cx("bonus-system-page")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content")}>
                    <Component />
                </div>
            </div>
        </div>
    );
};
