import { useLazyQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { GET_MODULE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import {
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
      if (index !== -1) {
        setNextModuleIndex(index);
      }
    }
  }, [moduleProgressData]);

  return nextModuleIndex ? (
    <>
      <Heading as="h2" size="lg" fontWeight="normal">
        Up Next
      </Heading>
      <NextModuleCard courseID={courseID} nextModuleIndex={nextModuleIndex} />
    </>
  ) : (
    <></>
  );
};

export default UpNext;
