import { useWindowSize } from "@/shared/hooks/useWindowSize";

export const useWindowSizeTo = (currWidth: number) => {
    const { width } = useWindowSize();

    return currWidth > (width || 0);
};
