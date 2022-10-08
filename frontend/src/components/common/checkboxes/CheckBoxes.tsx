import React, { useEffect } from "react";
import { Flex, VStack, Box, Center } from "@chakra-ui/react";

import CheckBox, { CheckBoxStyleParams } from "./CheckBox";

interface CheckBoxesParams extends CheckBoxStyleParams {
  setStatus: (statuses: boolean[]) => void;
  statuses: boolean[];
  multiSelect?: boolean;
  padding?: number;
  borderStyling?: (index: number) => string | undefined;
  backgroundStyling?: (index: number) => string | undefined;
  children: React.ReactElement[];
}

const CheckBoxes = ({
  setStatus,
  statuses,
  multiSelect = true,
  padding = 2,
  borderStyling = () => undefined,
  backgroundStyling = () => undefined,
  children,
  ...rest
}: CheckBoxesParams): React.ReactElement => {
  const updateCheckBox = (newStatus: boolean, i: number) => {
    let newStatuses = [...statuses];
    // Ensure only one answer is correct for MC
    if (!multiSelect && newStatus) {
      newStatuses = newStatuses.map(() => false);
    }
    newStatuses[i] = newStatus;
    return newStatuses;
  };

  const onClick = (i: number) => {
    setStatus(updateCheckBox(!statuses[i], i));
  };

  // Ensure only one answer is correct for MC
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!multiSelect && statuses.filter((s) => s).length) {
      setStatus(
        updateCheckBox(
          true,
          statuses.findIndex((s) => s),
        ),
      );
    }
  }, [multiSelect]);

  if (statuses.length !== children.length) {
    /* eslint-disable-next-line no-console */
    console.warn(
      `Status - Children length mismatch: ${statuses.length} vs ${children.length}`,
    );
    return <></>;
  }

  return (
    <VStack spacing={1} align="stretch">
      {children.map((child, i) => (
        <Flex
          key={i}
          border={borderStyling(i)}
          bg={backgroundStyling(i)}
          borderRadius="4px"
          padding={1}
        >
          <Center pr={padding}>
            <CheckBox
              isSelected={statuses[i]}
              radio={!multiSelect}
              onClick={() => onClick(i)}
              {...rest}
            />
          </Center>
          <Box flex={1}>{child}</Box>
        </Flex>
      ))}
    </VStack>
  );
};

export default CheckBoxes;
