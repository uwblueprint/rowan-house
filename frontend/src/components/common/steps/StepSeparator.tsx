import React from "react";
import { Box } from "@chakra-ui/react";

type StepSeparatorProps = {
  accentColor: string;
  completed: boolean;
  last: boolean;
  children: React.ReactNode;
};

const StepSeparator = ({
  accentColor,
  completed,
  last,
  children,
}: StepSeparatorProps): React.ReactElement => {
  let borderColor = "gray.200";
  if (last) {
    borderColor = "transparent";
  } else if (completed) {
    borderColor = accentColor;
  }

  return (
    <Box
      borderLeftWidth="2px"
      borderLeftColor={borderColor}
      h="100%"
      ml="8px"
      pl="32px"
      pt="16px"
      pb={React.Children.toArray(children).length ? "16px" : "8px"}
    >
      {children}
    </Box>
  );
};

export default StepSeparator;
