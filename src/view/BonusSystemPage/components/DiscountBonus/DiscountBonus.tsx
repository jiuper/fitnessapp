import { useEffect } from "react";
import { Spinner } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ConfirmModal } from "@/_Modals/ConfirmModal";
import { useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import defImg from "@/shared/assets/Image (2).png";
import Qr from "@/shared/assets/Stories.png";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/_Button";
import { ServiceCard } from "@/view/ServicePage/ServiceCard";

import styles from "./DiscountBonus.module.scss";

const cx = cnBind.bind(styles);

type DiscountBonusProps = {
    handleTab?: (num: number) => void;
};

export const DiscountBonus = ({ handleTab }: DiscountBonusProps = {}) => {
    const { companyInfo } = useClientContext();
    const [isOpen, onOpen, onClose] = useBooleanState(false);
    const [success, onSuccess] = useBooleanState(false);
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const handleOnPaymentMethod = () => {
        return withConfirm({
            message: "Желаете получить дисконтную карту BOGOKO? ",
            onSubmit: () => onOpen(),
            onClose: () => undefined,
        });
    };
    useEffect(() => {
        if (isOpen)
            setTimeout(() => {
                onSuccess();
            }, 2000);
    }, [isOpen, onClose, onSuccess]);

    return (
        <div className={cx("discount-bonus")}>
            <div className={cx("discount")}>
                <span className={cx("title")}>Дисконтная карта</span>
                {!isOpen ? (
                    !success ? (
                        <Button label="+" onClick={handleOnPaymentMethod} />
                    ) : (
                        <img className={cx("image")} src={Qr} alt="qr" />
                    )
                ) : (
                    <Spinner style={{ width: 120, height: 120 }} size="l" />
                )}
                <span className={cx("text")}>{`${
                    !isOpen
                        ? "Оформить дисконтную карту для начисления бонусов"
                        : success
                          ? "Предъявите экран на кассе для начисления бонусов"
                          : "Активация дисконтной карты"
                }`}</span>
            </div>
            <div className={cx("wrapper", "container")}>
                <div className={cx("list")}>
                    <div className={cx("item")}>
                        <span className={cx("caption")}>Получайте бонусы с дисконтной картой</span>
                        <span className={cx("text")}>
                            При покупке нашей услуги вы получаете кэшбэк в виде бонусных баллов,
                            которые можно использовать для следующих заказов.
                        </span>
                    </div>

                    <div className={cx("item")}>
                        <span className={cx("caption", "caption-card")}>
                            Примеры выгодной покупки
                        </span>
                        <div className={cx("cards")}>
                            {Array(2)
                                .fill("")
                                .map((_, i) => (
                                    <ServiceCard
                                        key={i}
                                        name="Примерная услуга чистка пяточек"
                                        time={60}
                                        priceMin={2000}
                                        priceMax={2000}
                                        percent={i === 0 ? 5 : 15}
                                        image={defImg}
                                        currencyShortTitle={companyInfo?.currencyShortTitle}
                                    />
                                ))}
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => handleTab?.(0)}
                    variant="outlined"
                    label="К системе бонусов"
                />
            </div>
            <ConfirmModal {...confirmModalProps} />
        </div>
    );
};
