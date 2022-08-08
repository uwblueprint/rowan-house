import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useState, useEffect } from "react";
import { GET_MODULE_PROGRESS } from "../../APIClients/queries/ProgressQueries";
import {
  ModuleProgress,
  ModuleProgressRequest,
  ModuleProgressResponse,
} from "../../APIClients/types/ProgressClientTypes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

const UpNext = (courseID: string): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [nextModuleIndex, setNextModuleIndex] = useState<number>();

  // const { refetch } = useQuery<
  //     ModuleProgressResponse,
  //     ModuleProgressRequest
  // // skip set to true prevents premature query call without valid authenticatedUser
  // >(GET_MODULE_PROGRESS, { skip: true });

  const [getModuleProgress, { data: moduleProgressData }] = useLazyQuery<
    ModuleProgressResponse,
    ModuleProgressRequest
  >(GET_MODULE_PROGRESS);

  // const getModuleProgress = async (
  //     moduleProgressAuthenticatedUser: AuthenticatedUser,
  //     moduleProgressCourseID: string,
  // ): Promise<ModuleProgressResponse | null> => {
  //     if (!moduleProgressAuthenticatedUser) {
  //         return null;
  //     }
  //     const res = await refetch({
  //         userId: moduleProgressAuthenticatedUser.id,
  //         courseId: moduleProgressCourseID,
  //     });
  //     const { data, error } = res;
  //     // TODO: Check if it's possible for data to be undefined
  //     // This code is inspired by AuthAPIClient.updateAuthenticatedUser
  //     if (error) {
  //         // TODO: add proper frontend logging
  //         // eslint-disable-next-line no-console
  //         console.log(error, data);
  //         return null;
  //     }
  //     return data;
  // };

  // const getNextModule = (nextModuleAuthenticatedUser: AuthenticatedUser, nextModuleCourseID: string) => {
  //     const moduleProgressResponse = getModuleProgress(nextModuleAuthenticatedUser, nextModuleCourseID);
  //     if (!moduleProgressResponse) {
  //         return;
  //     }
  //     for (const )
  //     for (const module of modulePRo) {
  //             if (!module.completedAt) {
  //                 return;
  //             }
  //         }
  // };

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
  return <></>;
};

export default UpNext;
