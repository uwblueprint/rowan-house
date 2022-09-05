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
import NextModuleCard from "./NextModuleCard";

interface UpNextProps {
  courseID: string;
}

const UpNext = ({ courseID }: UpNextProps): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [nextModuleIndex, setNextModuleIndex] = useState<number>();
  const [
    nextModuleProgress,
    setNextModuleProgress,
  ] = useState<ModuleProgress>();

  const [getModuleProgress, { data: moduleProgressData }] = useLazyQuery<
    ModuleProgressResponse,
    ModuleProgressRequest
  >(GET_MODULE_PROGRESS);

  const getNextModule = (
    nextModuleModuleProgressData: ModuleProgressResponse,
  ): number => {
    const { moduleProgress } = nextModuleModuleProgressData;
    for (let i = 0; i < moduleProgress.length; i += 1) {
      if (!moduleProgress[i].completedAt) {
        return i;
      }
    }
    return -1;
  };

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
    if (moduleProgressData) {
      const index = getNextModule(moduleProgressData);
      setNextModuleIndex(index);
      setNextModuleProgress(moduleProgressData.moduleProgress[index]);
    }
  }, [moduleProgressData]);

  if (nextModuleIndex && nextModuleIndex > 0 && nextModuleProgress) {
    return (
      <>
        <Heading as="h2" size="lg" fontWeight="normal">
          Up Next
        </Heading>
        <NextModuleCard
          courseID={courseID}
          nextModuleIndex={nextModuleIndex}
          nextModuleProgress={nextModuleProgress}
        />
      </>
    );
  }
  if (!nextModuleIndex) {
    return (
      <>
        <Heading as="h2" size="lg" fontWeight="normal">
          Up Next
        </Heading>
        <Spinner size="xl" />
      </>
    );
  }
  return <></>;
};
export default UpNext;
