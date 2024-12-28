import { ROUTING_MAP } from "@/shared/const/routing.ts";

export const useNavigationItems = () => {
    const role = 0;

    return ROUTING_MAP.filter((item) => item.accessRoles.includes(role || 0))
        .map((item) => ({ ...item }))
        .map(({ label, link, Icon, id }) => ({ label, link, Icon, id }));
};
