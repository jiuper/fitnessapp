import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { ConfirmModal, useConfirmModal } from "@/_Modals/ConfirmModal/ConfirmModal.tsx";
import { ButtonsAction } from "@/components/ButtonsAction";
import { ROUTES } from "@/shared/const/Routes.ts";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import { UploadImage } from "@/view/SettingPage/components/UploadImage";

import styles from "./CompanySetting.module.scss";

const cx = cnBind.bind(styles);

export const CompanySetting = () => {
    const href = useNavigate();
    const { withConfirm, modalProps: confirmModalPropsSave } = useConfirmModal();

    const handleOnSave = () => {
        return withConfirm({
            message: "Сохранить изменения?",
            onSubmit: formik.handleSubmit,
            onClose: () => undefined,
        });
    };

    const formik = useFormik({
        initialValues: {
            city: "",
            address: "",
            description: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className={cx("company-setting")}>
            <form onSubmit={formik.handleSubmit} className={cx("form")}>
                <UploadImage />
                <div className={cx("edit-info")}>
                    <InputText
                        isFullWidth
                        name="city"
                        label="Город"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                    />
                    <InputText
                        isFullWidth
                        name="address"
                        label="Адрес"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <InputTextarea
                        isFullWidth
                        name="description"
                        label="Описание"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
            <ButtonsAction
                isOpen
                onSubmit={formik.dirty ? handleOnSave : () => {}}
                onClose={() => href(ROUTES.SETTING)}
                btnLabel={["Сохранить изминения", "К настройкам"]}
            />
            <ConfirmModal {...confirmModalPropsSave} />
        </div>
    );
};
