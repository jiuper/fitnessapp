import type { GetCompanyDto } from "@/entities/company/types.ts";

export type GetMasterDto = {
    id?: string;
    name: string;
    phone?: string;
    user?: string;
    gym?: GetCompanyDto;
};

export interface GetMasterFullInfoDto {
    id?: string;
    name?: string;
    post?: string;
    description?: string;
    image?: string;
    rating?: string;
    seanceDate?: string;
    services?: MasterServiceInfo[];
    totalTimePriceInfo?: TotalTimePriceInfo;
    currency?: string;
}

export interface TotalTimePriceInfo {
    totalDuration?: number;
    totalPriceMin?: number;
    totalPriceMax?: number;
}

export interface MasterServiceInfo {
    id: string;
    name: string;
    image?: string;
    time?: number;
    priceMin?: number;
    priceMax?: number;
}
