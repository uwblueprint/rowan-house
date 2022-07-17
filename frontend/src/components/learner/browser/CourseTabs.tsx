import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
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
    <ButtonGroup>
      {TAB_NAMES.map((name) => {
        const selected = selectedTab === name;
        return (
          <Button
            leftIcon={selected ? <CheckIcon /> : undefined}
            key={name}
            variant={selected ? "md" : "outline-md"}
            onClick={() => setSelectedTab(name)}
          >
            {name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default CourseTabs;
