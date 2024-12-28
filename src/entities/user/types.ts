export interface UserDataAdd {
    id: number;
    tgUserid: string;
}
export interface UserData {
    id: string;
    user: UserDataAdd;
    name: string;
    biometricsList?: biometrics[];
}

export enum UserRole {
    DIRECTOR = 20,
    ADMINISTRATOR = 30,
    MASTER = 40,
    CLIENT = 50,
    ADMIN = 10,
    SUPERADMIN = 1,
    USER = 60,
}

export type biometrics = {
    client: UserData;
    height: number;
    weight: number;
    hipsCircumference: number;
    shouldersCircumference: number;
    chestCircumference: number;
    waistCircumference: number;
    dateTime: Date;
};
