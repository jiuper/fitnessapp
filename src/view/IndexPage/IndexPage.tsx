import { useParams } from "react-router";
import cnBind from "classnames/bind";

import type { GetCompanyDto } from "@/entities/company/types.ts";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import type { GetCategoryWithServiceDto } from "@/entities/services/types.ts";
import { ClientView } from "@/view/IndexPage/components/ClientView";
import { CompanyView } from "@/view/IndexPage/components/CompanyView";

import { MasterView } from "../Profile/components/MasterView";

import styles from "./IndexPage.module.scss";

const cx = cnBind.bind(styles);
type IndexPageProps = {
    listGym: GetCompanyDto[];
    listStaff: GetMasterDto[];
    listService: GetCategoryWithServiceDto[];
};
type FunctionType = "company" | "client" | "personal";

const componentMap = {
    company: CompanyView,
    client: ClientView,
    personal: MasterView,
};
export const IndexPage = ({ listGym, listStaff, listService }: IndexPageProps) => {
    const { url, id } = useParams<{ url?: string; id?: string }>();
    const Component = url ? componentMap[url as FunctionType] : componentMap.company;

    return (
        <div className={cx("control-panel")}>
            <div className={cx("wrapper")}>
                <div className={cx("tab-content")}>
                    <Component
                        listGym={listGym}
                        listStaff={listStaff}
                        listService={listService}
                        id={id || ""}
                    />
                </div>
            </div>
        </div>
    );
};
