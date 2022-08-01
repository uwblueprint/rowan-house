import { createContext } from "react";

type StepContextType = {
  currentStep: number;
  numSteps: number;
};

const StepContext = createContext<StepContextType>({
  currentStep: -2,
  numSteps: 0,
});

export default StepContext;
