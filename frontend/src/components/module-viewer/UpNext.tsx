import { useLazyQuery } from "@apollo/client";
import React, { useContext, useState, useEffect } from "react";
import { GET_MODULE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import {
  ModuleProgressRequest,
  ModuleProgressResponse,
} from "../../APIClients/types/ProgressClientTypes";
import AuthContext from "../../contexts/AuthContext";
import { CourseType } from "../../types/ModuleEditorTypes";

const UpNext = (courseData: CourseType): React.ReactElement => {
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
          courseId: courseData.id,
        },
      });
    }
  }, [
    authenticatedUser,
    setAuthenticatedUser,
    getModuleProgress,
    courseData.id,
  ]);

  useEffect(() => {
    if (moduleProgressData) {
      const index = getNextModule(moduleProgressData);
      if (index !== -1) {
        setNextModuleIndex(index);
      }
    }
  }, [moduleProgressData]);

  return <></>;
};

export default UpNext;