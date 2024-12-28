import { useState } from "react";

export type UseStepResult = [number, () => void, () => void, (step: number) => void];
export const useStep = (initialStep: number, min = 0, max = 100): UseStepResult => {
    const [step, setStep] = useState<number>(initialStep);
    const handleNextStep = () => setStep((prev) => Math.min(++prev, max));
    const handlePrevStep = () => setStep((prev) => Math.max(--prev, min));
    const handleSetStep = (step: number) => setStep(step);

    return [step, handleNextStep, handlePrevStep, handleSetStep];
};
