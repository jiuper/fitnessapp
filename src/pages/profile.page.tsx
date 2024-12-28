import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useAppSelector } from "@/shared/redux/configStore.ts";
import { Profile } from "@/view/Profile";

export const ProfilePage = () => {
    const user = useAppSelector((state) => state.account.userData);

    return (
        <PageLayout>
            <Profile user={user} listStaff={[]} listGym={[]} />
        </PageLayout>
    );
};
