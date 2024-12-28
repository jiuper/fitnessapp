import { useWindowSize } from "@/shared/hooks/useWindowSize";

export const useWindowSizeFrom = (currWidth: number) => {
    const { width } = useWindowSize();

    return currWidth < (width || 0);
};
