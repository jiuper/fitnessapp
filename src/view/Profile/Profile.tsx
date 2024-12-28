import { useParams } from "react-router";
import cnBind from "classnames/bind";

import type { GetMasterDto } from "@/entities/masters/types.ts";
import type { UserData } from "@/entities/user/types.ts";
import { ClientView } from "@/view/Profile/components/ClientView";
import { MasterView } from "@/view/Profile/components/MasterView";

import styles from "./Profile.module.scss";

const cx = cnBind.bind(styles);
type ProfileProps = {
    listStaff: GetMasterDto[];
    listGym: GetMasterDto[];
    user: UserData | null;
};
type FunctionType = "client" | "personal";

const componentMap = {
    client: ClientView,
    personal: MasterView,
};
export const Profile = ({ listStaff, listGym, user }: ProfileProps) => {
    const { url, id } = useParams<{ url?: string; id?: string }>();
    const IsClient = user?.biometricsList !== null ? componentMap.client : componentMap.personal;
    const Component = url ? componentMap[url as FunctionType] : IsClient;

    return (
        <div className={cx("control-panel")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content")}>
                    <Component user={user} listGym={listGym} listStaff={listStaff} id={id || ""} />
                </div>
            </div>
        </div>
    );
};
