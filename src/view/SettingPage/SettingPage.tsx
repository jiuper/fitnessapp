import { useParams } from "react-router";
import cnBind from "classnames/bind";

import { BonusSetting } from "@/view/SettingPage/components/BonusSetting";
import { CompanySetting } from "@/view/SettingPage/components/CompanySetting";
import { PersonalSetting } from "@/view/SettingPage/components/PersonalSetting";
import { PersonalAddSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalAddSetting";
import { PersonalInfoSetting } from "@/view/SettingPage/components/PersonalSetting/PersonalInfoSetting";
import { ProfileSetting } from "@/view/SettingPage/components/ProfileSetting";
import { ServiceSetting } from "@/view/SettingPage/components/ServiceSetting";
import { ServicesSetting } from "@/view/SettingPage/components/ServiceSetting/ServicesSetting";

import styles from "./SettingPage.module.scss";

const cx = cnBind.bind(styles);
type FunctionType =
    | "company"
    | "services"
    | "profile"
    | "serviceDetail"
    | "personal"
    | "personalDetail"
    | "personalAdd"
    | "bonus";

const componentMap = {
    company: CompanySetting,
    services: ServiceSetting,
    profile: ProfileSetting,
    serviceDetail: ServicesSetting,
    personal: PersonalSetting,
    personalDetail: PersonalInfoSetting,
    personalAdd: PersonalAddSetting,
    bonus: BonusSetting,
};
export const SettingPage = () => {
    const { url, id } = useParams<{ url?: string; id?: string }>();
    const Component = url ? componentMap[url as FunctionType] : componentMap.profile;

    return (
        <div className={cx("control-panel")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content")}>
                    <Component id={id || ""} />
                </div>
            </div>
        </div>
    );
};
