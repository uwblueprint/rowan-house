import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { ReactComponent as DocumentIcon } from "../../assets/document.svg";

type ModuleLessonCountProps = {
  moduleCount: number;
  lessonCount: number;
  color?: string;
};

const ModuleLessonCount = ({
  moduleCount,
  lessonCount,
  color = "text.default",
}: ModuleLessonCountProps): React.ReactElement => {
  return (
    <Box color={color}>
      <Icon
        as={DocumentIcon}
        marginTop="-4px"
        marginRight="3px"
        color={color}
        boxSize={25}
      />
      {moduleCount} {`${moduleCount > 1 ? "modules" : "module"}`} &bull;{" "}
      {lessonCount} {`${lessonCount > 1 ? "lessons" : "lesson"}`}
    </Box>
  );
};

export default ModuleLessonCount;
