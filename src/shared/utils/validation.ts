import { isValidPhoneNumber } from "libphonenumber-js";
import * as Yup from "yup";

import { replaceTemplateValues } from "@/shared/utils/replaceTemplateValues";

const validationMessages = {
    REQUIRED: "Это поле не может быть пустым",
    EMAIL_INVALID: "Некорректный email",
    EMAIL_BUSY: "Этот email уже занят",
    EMAIL_CHECK_REQUEST_FAILED: "Этот email уже занят",
    TEXT_IS_SHORT: "Мин. {{minValue}} символов",
    TEXT_IS_LONG: "Макс. {{maxValue}} символов",
    PASSWORD_WITHOUT_UPPERCASE: "Нет символов в верхнем регистре",
    PASSWORD_WITHOUT_LOWERCASE: "Нет символов в нижнем регистре",
    PASSWORD_WITHOUT_NUMBERS: "Нет чисел",
    PASSWORD_WITHOUT_SYMBOLS: "Нет символов",
    COORDINATES_OUT_OF_RANGE: "Координата не соответствует диапазону от -90° до 90°",
    COORDINATES_LATITUDE_OUT_OF_RANGE: "Координата не соответствует диапазону от -90° до 90°",
    COORDINATES_LONGITUDE_OUT_OF_RANGE: "Значение долготы не соответствует диапазону от -180° до 180°",
    PHONE_INCORRECT: "Некорректный номер телефона",
    URL_INCORRECT: "Некорректный юрл",

    NUMBER_LESS_THAN: "Мин. значение {{minValue}}",
    NUMBER_GREATER_THAN: "Макс. значение {{maxValue}}",
} as const;

export const ValidationError = {
    ...validationMessages,

    // NOTE: Rewrites;
    TEXT_IS_SHORT: (minValue: number) => replaceTemplateValues(validationMessages.TEXT_IS_SHORT, { minValue }),
    TEXT_IS_LONG: (maxValue: number) => replaceTemplateValues(validationMessages.TEXT_IS_LONG, { maxValue }),
    NUMBER_LESS_THAN: (minValue: number) => replaceTemplateValues(validationMessages.NUMBER_LESS_THAN, { minValue }),
    NUMBER_GREATER_THAN: (maxValue: number) =>
        replaceTemplateValues(validationMessages.NUMBER_GREATER_THAN, { maxValue }),
};

export const YupRequiredField = Yup.string().required(ValidationError.REQUIRED);
export const YupOptionalField = Yup.string().optional();
export const YupValidatePassword = (params?: { isOptional?: boolean }) => {
    const optionalValidation = Yup.string().optional();
    const requiredValidation = Yup.string()
        .required(ValidationError.REQUIRED)
        .min(6, ValidationError.TEXT_IS_SHORT(6))
        .matches(/[a-z]/g, ValidationError.PASSWORD_WITHOUT_LOWERCASE)
        .matches(/[A-Z]/g, ValidationError.PASSWORD_WITHOUT_UPPERCASE)
        .matches(/[0-9]/g, ValidationError.PASSWORD_WITHOUT_NUMBERS)
        .matches(/\W/g, ValidationError.PASSWORD_WITHOUT_SYMBOLS);

    return params?.isOptional
        ? Yup.string().when((_, __, { value }) => (value ? requiredValidation : optionalValidation))
        : requiredValidation;
};
export const YupValidateEmail = (params?: { isOptional?: boolean }) => {
    const optionalValidation = Yup.string().optional();
    const requiredValidation = Yup.string().required(ValidationError.REQUIRED).email(ValidationError.EMAIL_INVALID);

    return params?.isOptional
        ? Yup.string().when((_, __, { value }) => (value ? requiredValidation : optionalValidation))
        : requiredValidation;
};
export const YupValidatePhone = Yup.string().test(
    "validatePhone",
    ValidationError.PHONE_INCORRECT,
    (value) => !!value && isValidPhoneNumber(value),
);
export const YupValidateUrl = () => {
    const regMatch =
        /\/^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+(\/)?.([w?[a-zA-Z-_%/@?]+)*([^/w?[a-zA-Z0-9_-]+=w+(&[a-zA-Z0-9_]+=w+)*)?$\//;

    return Yup.string().matches(regMatch, ValidationError.URL_INCORRECT);
};

export const SignupSchema = Yup.object().shape({
    firstName: YupRequiredField.required(validationMessages.REQUIRED),
    phone: YupValidatePhone,
});
