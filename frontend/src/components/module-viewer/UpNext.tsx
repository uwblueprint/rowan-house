import { useLazyQuery } from "@apollo/client";
import { Spinner, Text } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { GET_MODULE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import {
  ModuleProgress,
  ModuleProgressRequest,
  ModuleProgressResponse,
} from "../../APIClients/types/ProgressClientTypes";
import AuthContext from "../../contexts/AuthContext";
import { ModuleType } from "../../types/ModuleEditorTypes";
import NextModuleCard from "./NextModuleCard";

interface UpNextProps {
  courseID: string;
  courseImage: string | null; // used in case of moduleImage not existing
  moduleIndex: number;
  modules: ModuleType[];
}

const UpNext = ({
  courseID,
  courseImage,
  moduleIndex,
  modules,
}: UpNextProps): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const nextModuleIndex = moduleIndex + 1;

  const [
    nextModuleProgress,
    setNextModuleProgress,
  ] = useState<ModuleProgress>();

  const [getModuleProgress, { data: moduleProgressData }] = useLazyQuery<
    ModuleProgressResponse,
    ModuleProgressRequest
  >(GET_MODULE_PROGRESS);

  useEffect(() => {
    if (authenticatedUser) {
      getModuleProgress({
        variables: {
          userId: authenticatedUser.id,
          courseId: courseID,
        },
      });
    }
  }, [authenticatedUser, getModuleProgress, courseID]);

  useEffect(() => {
    if (
      moduleProgressData &&
      nextModuleIndex < moduleProgressData.moduleProgress.length
    ) {
      setNextModuleProgress(moduleProgressData.moduleProgress[nextModuleIndex]);
    }
  }, [moduleProgressData, nextModuleIndex]);

  if (nextModuleIndex >= modules.length) {
    return <></>;
  }

  // Check if we have verified the current module progress
  // nextModuleProgress is undefined if next module hasn't been started
  return (
    <>
      <Text variant="heading">Up Next</Text>
      {moduleProgressData ? (
        <NextModuleCard
          courseID={courseID}
          courseImage={courseImage}
          nextModuleIndex={nextModuleIndex}
          nextModuleProgress={nextModuleProgress}
          modules={modules}
        />
      ) : (
        <Spinner size="xl" />
      )}
    </>
  );
};
export default UpNext;
