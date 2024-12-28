type ShitModelBadProperties = {
    firstName: string | null;
    lastName: string | null;
    updatedBy: string | null;
    createdBy: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    language: Language;
};
export type ShitModelConverter<T> = {
    [Property in keyof T]-?: Property extends keyof ShitModelBadProperties
        ? ShitModelBadProperties[Property]
        : T[Property];
} & Omit<T, keyof ShitModelBadProperties>;

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Paths<T> = T extends object
    ? {
          [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`;
      }[keyof T]
    : never;

export type Leaves<T> = T extends object
    ? {
          [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`;
      }[keyof T]
    : never;

export enum FetchStatus {
    IDLE = "idle",
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

export enum HttpExceptionType {
    REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
    REFRESH_TOKEN_VERIFY = "REFRESH_TOKEN_VERIFY",
    TOKEN_EXPIRED = "token-expired",
    TOKEN_MALFORMED = "TOKEN_MALFORMED",
    TOKEN_NOT_PROVIDED = "TOKEN_NOT_PROVIDED",
    TOKEN_VERIFY = "TOKEN_VERIFY",
}

export enum HttpStatus {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
}

export enum Currency {
    USD = "USD",
    EUR = "EUR",
    AED = "AED",
}
export enum Language {
    English = "en",
    Russian = "ru",
}

export type StorageSettings = {
    currency: Currency;
    sideBarExpanded: boolean;
};
