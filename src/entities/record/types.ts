import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";

export interface ResponseNewRecordDto {
    recordId?: string;
    ycRecordId?: string;
    ycRecordHash?: string;
    clientName?: string;
    clientPhone?: string;
    clientComment?: string;
    datetime?: string;
    master?: GetMasterFullInfoDto;
    message?: string;
}

export interface ResponseGetRecordShortInfoDto {
    id?: string;
    ycRecordId?: string;
    clientName?: string;
    clientPhone?: string;
    clientComment?: string;
    datetime?: string;
    duration?: number;
    masterName?: string;
    masterImage?: string;
    servicesName: string[];
    currency?: string;
    totalPriceMin?: number;
    totalPriceMax?: number;
    isFeedback?: boolean;
}

interface User {
    id: string; // Предполагаем, что UUID представлен как строка
    name: string;
    // Добавьте другие поля пользователя, если необходимо
}

interface TrainingType {
    id: string; // Предполагаем, что UUID представлен как строка
    name: string;
    // Добавьте другие поля типа тренировки, если необходимо
}

interface IndividualExercise {
    id: string; // Предполагаем, что UUID представлен как строка
    name: string;
    exercise: Exercise;
    repeatCount: number;
    weight: number;
    approachCount: number;
    restTime: number;
    number: number;
    video: Video;
}
interface Exercise {
    name: string;
    videoList: Video[];
    muscleGroups: MuscleGroup[];
}
interface MuscleGroup {
    id: string; // Предполагаем, что идентификатор представлен как строка
    name: string;
}
interface Video {
    name: string;
    link: string;
}

export interface Record {
    client: User;
    staff: User;
    dateTime: Date;
    comment: string;
    duration: number;
    trainingType: TrainingType;
    individualExercises: IndividualExercise[];
    isApproved: boolean;
    isComplete: boolean;
}
