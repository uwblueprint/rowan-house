import React, { useEffect } from "react";
import { SimpleGrid, Box, Center } from "@chakra-ui/react";

import CheckBox from "./CheckBox";

interface CheckBoxesParams {
  setStatus: (statuses: boolean[]) => void;
  statuses: boolean[];
  multiSelect?: boolean;
  children: React.ReactElement[];
}

const CheckBoxes = ({
  setStatus,
  statuses,
  multiSelect = true,
  children,
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
    <SimpleGrid templateColumns="30px 1fr" spacingY={2}>
      {children.map((child, i) => (
        <>
          <Center>
            <CheckBox
              status={statuses[i]}
              radio={!multiSelect}
              onClick={() => onClick(i)}
            />
          </Center>
          <Box>{child}</Box>
        </>
      ))}
    </SimpleGrid>
  );
};

export default CheckBoxes;
