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
    <Box>
      <Icon
        as={DocumentIcon}
        marginTop="-4px"
        marginRight="3px"
        color={color}
      />
      {moduleCount} modules &bull; {lessonCount} lessons
    </Box>
  );
};

export default ModuleLessonCount;
