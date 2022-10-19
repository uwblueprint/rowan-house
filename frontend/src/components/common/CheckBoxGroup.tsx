import React, { useEffect } from "react";
import { Box, Radio, Checkbox, Stack } from "@chakra-ui/react";

interface CheckBoxGroupParams {
  setStatus: (statuses: boolean[]) => void;
  statuses: boolean[];
  multiSelect?: boolean;
  spacing?: number;
  borderStyling?: (index: number) => string | undefined;
  backgroundStyling?: (index: number) => string | undefined;
  selectedColor?: string;
  disabled?: boolean;
  children: React.ReactElement[];
}

const CheckBoxGroup = ({
  setStatus,
  statuses,
  multiSelect = true,
  spacing = 2,
  borderStyling = () => undefined,
  backgroundStyling = () => undefined,
  selectedColor = "CBgreen",
  disabled = false,
  children,
}: CheckBoxGroupParams): React.ReactElement => {
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
    if (!disabled) setStatus(updateCheckBox(!statuses[i], i));
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
    <Stack direction="column" spacing={2} align="stretch">
      {children.map((child, i) => (
        <Stack
          direction="row"
          key={i}
          padding={1}
          align="center"
          borderRadius="4px"
          border={borderStyling(i)}
          bg={backgroundStyling(i)}
          spacing={spacing}
        >
          <Box mt={2}>
            {multiSelect ? (
              <Checkbox
                onChange={() => onClick(i)}
                isChecked={statuses[i]}
                colorScheme={selectedColor}
              />
            ) : (
              <Radio
                onChange={() => onClick(i)}
                isChecked={statuses[i]}
                colorScheme={selectedColor}
              />
            )}
          </Box>
          <Box flex={1}>{child}</Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default CheckBoxGroup;
