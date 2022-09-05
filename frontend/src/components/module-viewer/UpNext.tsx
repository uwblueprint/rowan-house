import { useLazyQuery } from "@apollo/client";
import { Heading, Spinner } from "@chakra-ui/react";
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
  moduleIndex: number;
  modules: ModuleType[];
}

const UpNext = ({
  courseID,
  moduleIndex,
  modules,
}: UpNextProps): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
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
  }, [authenticatedUser, setAuthenticatedUser, getModuleProgress, courseID]);

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
  if (moduleProgressData) {
    return (
      <>
        <Heading as="h2" size="lg" fontWeight="normal">
          Up Next
        </Heading>
        <NextModuleCard
          courseID={courseID}
          nextModuleIndex={nextModuleIndex}
          nextModuleProgress={nextModuleProgress}
          modules={modules}
        />
      </>
    );
  }
  return (
    <>
      <Heading as="h2" size="lg" fontWeight="normal">
        Up Next
      </Heading>
      <Spinner size="xl" />
    </>
  );
};
export default UpNext;
