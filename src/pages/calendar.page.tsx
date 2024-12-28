import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { CalendarPage } from "@/view/CalendarPage";

export const СalendarPageIndex = () => {
    const user = useAppSelector((state) => state.account.userData);
    const { data: listMaster } = useAllMastersQuery(true);

    return (
        <PageLayout>
            <CalendarPage userRole={user?.role || 40} listMaster={listMaster} />
        </PageLayout>
    );
};
