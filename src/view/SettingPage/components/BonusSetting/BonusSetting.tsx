import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { ConfirmModal, useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import { ButtonsAction } from "@/components/ButtonsAction";
import tg from "@/shared/assets/icon/Avatar.svg";
import inst from "@/shared/assets/icon/Group 21.svg";
import tiktok from "@/shared/assets/icon/tik.svg";
import { ROUTES } from "@/shared/const/Routes.ts";
import { CardNetwork } from "@/view/SettingPage/components/PersonalSetting/PersonalInfoSetting/CardNetwork";

import styles from "./BonusSetting.module.scss";

const cx = cnBind.bind(styles);
type BonusSettingProps = {};
const socialNetworks = [
    { icon: tg, title: "Telegram", id: "telegram" },
    { icon: inst, title: "Instagram", id: "instagram" },
    { icon: tiktok, title: "TikTok", id: "tiktok" },
    { title: "YouTube", id: "youtube" }, // Для YouTube иконка не указана, но можно добавить позже
];

export const BonusSetting = ({}: BonusSettingProps) => {
    const href = useNavigate();
    const { withConfirm: withConfirmData, modalProps: modalSaveData } = useConfirmModal();

    const formik = useFormik({
        initialValues: {
            name: "",
            socialNetworks: socialNetworks.reduce(
                (acc, network) => {
                    acc[network.id] = "";

                    return acc;
                },
                {} as Record<string, string>,
            ),
        },
        onSubmit: () => {},
    });

    const handleSaveData = () => {
        withConfirmData({
            message: "Изменения не будут сохранены. Всё равно закрыть?",
            onSubmit: () => href(`${ROUTES.SETTING}`),
            onClose: () => undefined,
        });
    };

    const handleSave = () => {
        formik.handleSubmit();
        href(`${ROUTES.SETTING}`);
    };

    return (
        <div className={cx("bonus-setting")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("network")}>
                    <span className={cx("title")}>Социальные сети</span>
                    <div className={cx("list")}>
                        {socialNetworks.map((network) => (
                            <CardNetwork
                                key={network.id}
                                icon={network.icon}
                                title={network.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    formik.setFieldValue(
                                        `socialNetworks.${network.id}`,
                                        e.target.checked,
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ButtonsAction
                isOpen
                onSubmit={handleSave}
                onClose={formik.dirty ? handleSaveData : () => href(`${ROUTES.SETTING}`)}
                btnLabel={[formik.dirty ? "Cохранить изменения" : "", "К настройкам"]}
            />
            <ConfirmModal {...modalSaveData} />
        </div>
    );
};
