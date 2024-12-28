import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import tg from "@/shared/assets/icon/Avatar.svg";
import inst from "@/shared/assets/icon/Group 21.svg";
import tiktok from "@/shared/assets/icon/tik.svg";
import { Button } from "@/shared/ui/_Button";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./RulesBonus.module.scss";

const cx = cnBind.bind(styles);
type RulesBonusProps = {
    handleTab?: (num: number) => void;
    isActive?: boolean;
};
export const RulesBonus = ({ handleTab, isActive }: RulesBonusProps) => {
    const list = [
        { image: tg, title: "Telegram" },
        { image: inst, title: "Instagram" },
        { image: tiktok, title: "TikTok" },
    ];

    return (
        <div className={cx("rules-bonus")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("list")}>
                    <div className={cx("item")}>
                        <span className={cx("caption")}>Бонус за подписку</span>
                        <span className={cx("text")}>
                            Подписавшись на наш Telegram-канал, вам автоматически зачисляются бонусы
                            на баланс.
                        </span>
                    </div>
                    <div className={cx("item")}>
                        <span className={cx("caption", "caption-card")}>Правила</span>
                        <span className={cx("text")}>
                            Бонусы накапливаются за покупки услуг и не только, где 1 бонус равен 1
                            рублю. Их можно использовать для частичной или полной оплаты услуг на
                            сайте при оформлении заказа.
                        </span>
                    </div>
                    <div className={cx("items")}>
                        {list.map((el, i) => (
                            <div key={i} className={cx("item")}>
                                <Avatar
                                    size={40}
                                    className={cx("avatar")}
                                    src={el.image}
                                    alt={el.title}
                                />
                                <div className={cx("info")}>
                                    <span className={cx("title")}>{el.title}</span>
                                    {isActive && <span className={cx("text")}>Бонус получен</span>}
                                </div>
                                <div className={cx("icon")}>
                                    <SvgIcon name="ArrowRight" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    variant="outlined"
                    onClick={() => handleTab?.(0)}
                    label="К системе бонусов"
                />
            </div>
        </div>
    );
};
