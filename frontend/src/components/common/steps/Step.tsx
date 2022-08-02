import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import StepContext from "./StepContext";
import StepIcon from "./StepIcon";
import StepSeparator from "./StepSeparator";

type StepProps = {
  accentColor?: string;
  index: number;
  label: string | React.ReactNode;
  children: React.ReactNode;
};

const Step = ({
  accentColor = "brand.royal",
  index,
  label,
  children,
}: StepProps): React.ReactElement => {
  const { currentStep, numSteps } = useContext(StepContext);
  return (
    <Box>
      <Box>
        <Flex align="center" h="18px">
          <StepIcon
            accentColor={accentColor}
            completed={index < currentStep}
            active={index === currentStep}
          />
          {label}
        </Flex>
        <StepSeparator
          accentColor={accentColor}
          last={index === numSteps - 1}
          completed={index < currentStep}
        >
          {children}
        </StepSeparator>
      </Box>
    </Box>
  );
};

export default Step;
