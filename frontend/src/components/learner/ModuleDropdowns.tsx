import React from "react";
import { Box, Accordion } from "@chakra-ui/react";

import { ModuleResponse } from "../../APIClients/types/CourseClientTypes";
import { ModuleProgressResponse } from "../../APIClients/types/ProgressClientTypes";
import ModuleDropdown from "./ModuleDropdown";

type ModuleDropdownsProps = {
  modules?: ModuleResponse[];
  progress?: ModuleProgressResponse;
  courseID: string;
};

const ModuleDropdowns = ({
  modules,
  progress,
  courseID,
}: ModuleDropdownsProps): React.ReactElement => {
  return (
    <Accordion w="100%" allowToggle>
      {modules?.map(
        (module: ModuleResponse, i: number) =>
          module && (
            <>
              <ModuleDropdown
                module={module}
                progress={
                  progress?.moduleProgress
                    ? progress.moduleProgress[i]
                    : undefined
                }
                index={i}
                courseID={courseID}
                key={i}
              />
              <Box h="1rem" />
            </>
          ),
      )}
    </Accordion>
  );
};

export default ModuleDropdowns;
