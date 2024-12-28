import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { Avatar, Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { ConfirmModal, useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import { ButtonsAction } from "@/components/ButtonsAction";
import { useMasterQuery } from "@/entities/masters/api/getMasterApi";
import { ROUTES } from "@/shared/const/Routes.ts";
import { InputText } from "@/shared/ui/_InputText";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { CardNetwork } from "@/view/SettingPage/components/PersonalSetting/PersonalInfoSetting/CardNetwork";

import styles from "./PersonalInfoSetting.module.scss";

const cx = cnBind.bind(styles);
type PersonalInfoSettingProps = {
    id: string;
};
export const PersonalInfoSetting = ({ id }: PersonalInfoSettingProps) => {
    const href = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { withConfirm, modalProps } = useConfirmModal();
    const { withConfirm: withConfirmData, modalProps: modalSaveData } = useConfirmModal();
    const listMasterFullInfo = useMasterQuery([id]);
    const listMasterData = useMemo(() => listMasterFullInfo[0] || [], [listMasterFullInfo]);
    const formik = useFormik({
        initialValues: {
            name: listMasterData.name,
            post: listMasterData.post,
            file: null,
        },
        onSubmit: () => {},
    });

    const handleFileInputClick = () => fileInputRef?.current?.click();

    const handleDeactivate = () => {
        withConfirm({
            message: "Удалить эту услугу из списка мастера?",
            onSubmit: () => {},
            onClose: () => undefined,
        });
    };

    const handleSaveData = () => {
        withConfirmData({
            message: "Изменения не будут сохранены. Всё равно закрыть?",
            onSubmit: () => href(`${ROUTES.SETTING}/personal`),
            onClose: () => undefined,
        });
    };

    const handleSave = () => {
        formik.handleSubmit();
        href(`${ROUTES.SETTING}/personal`);
    };

    return (
        <div className={cx("personal-info-setting")}>
            <form className={cx("form")} onSubmit={formik.handleSubmit}>
                <div className={cx("header")}>
                    <div className={cx("avatar")} onClick={handleFileInputClick}>
                        <Avatar size={96} src={listMasterData.image} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={formik.handleChange}
                            name="file"
                            style={{ display: "none" }}
                        />
                        <Badge className={cx("badge")} type="number">
                            {listMasterData.rating || 3.9}
                        </Badge>
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>{listMasterData.name}</span>
                        <span className={cx("post")}>{listMasterData.post}</span>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("account")}>
                        <span className={cx("title")}>Аккаунт</span>
                        <div className={cx("list")}>
                            <InputText
                                onChange={formik.handleChange}
                                name="name"
                                label="ФИО"
                                isFullWidth
                                value={formik.values.name}
                            />
                            <InputText
                                onChange={formik.handleChange}
                                name="post"
                                label="Должность"
                                isFullWidth
                                value={formik.values.post}
                            />
                        </div>
                    </div>
                    <div className={cx("network")}>
                        <span className={cx("title")}>Способ связи</span>
                        <div className={cx("list")}>
                            <CardNetwork />
                        </div>
                    </div>
                    <div className={cx("list-services", formik.dirty && "active")}>
                        <span className={cx("title")}>Услуги</span>
                        <div className={cx("list")}>
                            {listMasterData?.services?.map((card, i) => (
                                <div onClick={handleDeactivate} className={cx("card")} key={i}>
                                    <span>{card.name}</span>
                                    <div className={cx("close")}>
                                        <SvgIcon name="close" className={cx("close-icon")} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx("button")}>
                    <ButtonsAction
                        isOpen
                        onSubmit={handleSave}
                        onClose={
                            formik.dirty ? handleSaveData : () => href(`${ROUTES.SETTING}/personal`)
                        }
                        btnLabel={[formik.dirty ? "Cохранить изменения" : "", "К мастерам"]}
                    />
                </div>
            </form>
            <ConfirmModal {...modalProps} />
            <ConfirmModal {...modalSaveData} />
        </div>
    );
};
