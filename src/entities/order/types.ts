export interface RequestRecordDto {
    client: string; // UUID представлен как строка
    staff: string; // UUID представлен как строка
    dateTime: string;
    comment: string;
    duration: number;
    trainingType: string; // UUID представлен как строка
    isApproved: boolean;
    isComplete: boolean;
}

export interface RequestMasterServicesRecordDto {
    masterId: string;
    serviceId: string[];
}

export type RequestGetDateTimesDto = {
    date?: string;
    masters: RequestMasterServicesRecordDto[];
};

export type RequestGetDatesTrueDto = {
    dateFrom: string;
    dateTo: string;
    masters: RequestMasterServicesRecordDto[];
};

export interface GetMasterServiceDateTimesMulti {
    dateTrue?: string[];
    dateNear?: string;
    times?: string[];
}

export interface WorkDataInfo {
    dateTrue?: string[];
    dateNear?: string;
    times?: string[];
}
