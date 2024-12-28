import cnBind from "classnames/bind";

import { Button } from "@/shared/ui/_Button";

import styles from "./FriendsBonus.module.scss";

const cx = cnBind.bind(styles);
type FriendsBonusProps = {
    handleTab?: (num: number) => void;
};
export const FriendsBonus = ({ handleTab }: FriendsBonusProps = {}) => {
    return (
        <div className={cx("friends-bonus")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("list")}>
                    <span className={cx("caption")}>Приглашайте друзей и получайте бонусы</span>
                    <span className={cx("text")}>
                        Делитесь ссылкой на салон BOGOKO в Telegram и других социальных сетях со своими друзьями и
                        наслаждайтесь дополнительными бонусами на вашем балансе!
                    </span>
                </div>
                <Button onClick={() => handleTab?.(0)} variant="outlined" label="К системе бонусов" />
            </div>
        </div>
    );
};
