import React from "react";
import { Box } from "@chakra-ui/react";
import StepContext from "./StepContext";

type StepsProps = {
  currentStep: number;
  children: React.ReactNode;
};

const Steps = ({ currentStep, children }: StepsProps): React.ReactElement => (
  <StepContext.Provider
    value={{ currentStep, numSteps: React.Children.toArray(children).length }}
  >
    <Box width="100%">{children}</Box>
  </StepContext.Provider>
);

export default Steps;
