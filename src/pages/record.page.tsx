import { useMemo } from "react";
import { useParams } from "react-router";

import { useRecordQuery } from "@/entities/record/api/getRecord";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { RecordPage } from "@/view/RecordPage";

export const Record = () => {
    const { id } = useParams();
    const { newRecord } = useClientContext();

    const { data: oldRecord } = useRecordQuery(id || "");
    const data = useMemo(() => (id ? oldRecord : newRecord), [id, newRecord, oldRecord]);

    return (
        <PageLayout>
            <RecordPage data={data} />
        </PageLayout>
    );
};
