import tg from "@/shared/assets/icon/Avatar.svg";
import inst from "@/shared/assets/icon/Group 21.svg";
import tiktok from "@/shared/assets/icon/tik.svg";

export const listSocialNetworks = [
    {
        id: "1",
        name: "Telegram",
        icon: tg,
        value: false,
    },
    {
        id: "2",
        name: "Instagram",
        icon: inst,
        value: true,
    },
    {
        id: "3",
        name: "TikTok",
        icon: tiktok,
        value: false,
    },
    {
        id: "4",
        name: "Whatsapp",
        icon: "",
        value: true,
    },
    {
        id: "5",
        name: "Viber",
        icon: "",
        value: false,
    },
    {
        id: "6",
        name: "Телефон",
        icon: "",
        value: true,
    },
];
export const listFeedback = [
    {
        id: "1",
        name: "Ответ на отзыв",
        icon: "",
        value: true,
    },
    {
        id: "2",
        name: "Удаление отзыва",
        icon: "",
        value: false,
    },
];
export const listServices = [
    {
        id: "1",
        name: "Возможность скрыть услугу ",
        icon: "",
        value: true,
    },
    {
        id: "2",
        name: "Удаление услуги",
        icon: "",
        value: false,
    },
    {
        id: "3",
        name: "Добавление фотографий",
        icon: "",
        value: false,
    },
    {
        id: "4",
        name: "Создание/добавление услуги?",
        icon: "",
        value: false,
    },
];
export const listAccount = [
    {
        id: "1",
        name: "Изменение личной информации ",
        icon: "",
        value: true,
    },
    {
        id: "2",
        name: "Изменение фотографии",
        icon: "",
        value: false,
    },
];

export const settingPersonal = [
    { title: "Добавление способов связи", list: listSocialNetworks },
    { title: "Взаимодействие с отзывами", list: listFeedback },
    { title: "Управление услугами", list: listServices },
    { title: "Управление аккаунтом", list: listAccount },
];
