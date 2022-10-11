import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export const TAB_NAMES = [
  "All Courses",
  "Complete",
  "In Progress",
  "Not Started",
];

type CourseTabsProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

const CourseTabs = ({
  selectedTab,
  setSelectedTab,
}: CourseTabsProps): React.ReactElement => {
  return (
    <Stack direction={["column", "row"]} width="100%">
      {TAB_NAMES.map((name) => {
        const selected = selectedTab === name;
        return (
          <Button
            width={["100%", "initial"]}
            leftIcon={selected ? <CheckIcon /> : undefined}
            key={name}
            variant={selected ? "md" : "outline-md"}
            onClick={() => setSelectedTab(name)}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
};

export default CourseTabs;
