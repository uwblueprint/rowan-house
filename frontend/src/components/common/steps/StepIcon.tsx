import React from "react";
import { Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

type StepIconProps = {
  accentColor: string;
  active: boolean;
  completed: boolean;
};

const StepIcon = ({
  accentColor,
  active,
  completed,
}: StepIconProps): React.ReactElement => (
  <Flex
    align="center"
    justify="center"
    borderRadius="50%"
    borderWidth="2px"
    borderColor={active || completed ? accentColor : "gray.200"}
    bg={completed ? accentColor : "unset"}
    w="18px"
    h="18px"
    mr="24px"
  >
    {completed && <CheckIcon color="white" w="10px" h="10px" />}
  </Flex>
);

export default StepIcon;
