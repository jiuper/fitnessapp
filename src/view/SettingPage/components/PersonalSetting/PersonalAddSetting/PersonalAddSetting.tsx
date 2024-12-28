import { useRef } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { ConfirmModal, useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import { ButtonsAction } from "@/components/ButtonsAction";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { settingPersonal } from "@/view/SettingPage/components/PersonalSetting/PersonalAddSetting/const.ts";
import { Point } from "@/view/SettingPage/components/PersonalSetting/PersonalAddSetting/Point";

import styles from "./PersonalAddSetting.module.scss";

const cx = cnBind.bind(styles);

type SettingItem = { id: string; name: string; icon: string; value: boolean };
type SettingSection = { title: string; list: SettingItem[] };
type FormValues = {
    name: string;
    post: string;
    file: File | null;
    sections: SettingSection[];
};
const createInitialValues = (): FormValues => {
    const initialValues: FormValues = { name: "", post: "", file: null, sections: [] };
    settingPersonal.forEach((section: SettingSection) => {
        const sectionValues = section.list.map((item: SettingItem) => ({ ...item }));
        initialValues.sections.push({ title: section.title, list: sectionValues });
    });

    return initialValues;
};

type PersonalAddSettingProps = {};
export const PersonalAddSetting = ({}: PersonalAddSettingProps) => {
    const href = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileInputClick = () => fileInputRef?.current?.click();
    const { withConfirm, modalProps } = useConfirmModal();
    const { withConfirm: withConfirmData, modalProps: modalSaveData } = useConfirmModal();
    const formik = useFormik({
        initialValues: createInitialValues(),
        onSubmit: () => {},
    });

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
                        <Avatar size={96} acronym="ИФ" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={formik.handleChange}
                            name="file"
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>Имя Фамилия</span>
                        <span className={cx("post")}>Должность</span>
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
                    <div className={cx("list-services")}>
                        <span className={cx("title")}>Услуги</span>
                        <div className={cx("list")}>
                            <span className={cx("message")}>Нет добавленных услуг</span>
                            <Button
                                variant="outlined"
                                onClick={handleDeactivate}
                                label="Добавить из списка"
                            />
                        </div>
                    </div>
                    {formik.values.sections.map((section, i) => (
                        <div key={i} className={cx("list-services", formik.dirty && "active")}>
                            <span className={cx("title")}>{section.title}</span>
                            <div className={cx("list")}>
                                {section.list.map((item, index) => (
                                    <Point
                                        key={item.id}
                                        title={item.name}
                                        icon={item.icon}
                                        name={`sections[${i}].list[${index}].value`}
                                        onChange={formik.handleChange}
                                        value={formik.values.sections[i].list[index].value}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
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
