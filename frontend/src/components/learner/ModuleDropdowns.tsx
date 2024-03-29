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
  // TODO: Have to filter because course contains deleted modules
  return (
    <Accordion w="100%" allowToggle>
      {modules
        ?.filter((n) => n)
        .map(
          (module: ModuleResponse, i: number) =>
            module && (
              <React.Fragment key={module.id}>
                <ModuleDropdown
                  module={module}
                  progress={
                    progress?.moduleProgress
                      ? progress.moduleProgress[i]
                      : undefined
                  }
                  index={i}
                  courseID={courseID}
                />
                <Box h="1rem" />
              </React.Fragment>
            ),
        )}
    </Accordion>
  );
};

export default ModuleDropdowns;
