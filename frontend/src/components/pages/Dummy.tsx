import * as React from "react";
import { Button } from '@chakra-ui/react';
import { gql, useMutation, useQuery } from "@apollo/client";

import { CourseRequest, CourseResponse } from "../../APIClients/CourseAPIClient";

const Dummy = (): React.ReactElement => {
  
const CREATE_COURSE = gql`
  mutation CreateCourse($course: CreateCourseRequestDTO!) {
    createCourse(course: $course) {
      title
      description
      image
      previewImage
      lessons
      private
      published
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $course: UpdateCourseRequestDTO!) {
    updateCourse(id: $id, course: $course) {
      title
      description
      image
      previewImage
      lessons
      private
      published
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

const COURSES = gql`
  query GetCourses {
    courses {
      title
      description
      image
      previewImage
      lessons
      private
      published
    }
  }
`;

const [createCourse] = useMutation<{ createCourse: CourseResponse }>(
  CREATE_COURSE,
);

const [updateCourse] = useMutation<{ updateCourse: CourseResponse }>(
  UPDATE_COURSE,
);

const [deleteCourse] = useMutation<{ deleteCourse: string }>(
  DELETE_COURSE,
);

const [courses, setCourses] = React.useState<CourseResponse[] | null>(null);

  useQuery(COURSES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (_data) => {
      setCourses(_data.courses.map((d: CourseResponse) => (d)));
    },
  });

const courseEx : CourseRequest = {
  title: "course1",
  description: "course 1 asdf",
  image: "string",
  previewImage: "string",
  lessons: ["hello"],
  private: true,
  published: true,
}

const updateEx : Partial<CourseRequest> = {
  title: "course updated yyyyyy!!!!",
}
/* eslint object-shorthand: ["error", "never"] */
/* eslint-env es6 */
  const createCall = async (course: CourseRequest) => {
    const graphQLResult = await createCourse({variables: {course: course}});
    const result: CourseResponse | null =
      graphQLResult.data?.createCourse ?? null;
      console.log("Created course: ", result);
  }
  const updateCall = async (_id: string, course: Partial<CourseRequest>) => {
    const graphQLResult = await updateCourse({variables: {id: _id, course: course}});
    const result: CourseResponse | null =
      graphQLResult.data?.updateCourse ?? null;
      console.log("Updated course: ", result)
  }

  const deleteCall = async (_id: string) => {
    const graphQLResult = await deleteCourse({variables: {id: _id}});
    const result: string | null =
      graphQLResult.data?.deleteCourse ?? null;
    console.log("course deleted:", result)
  }

  return (
    <div>
      <Button onClick={() => createCall(courseEx)}>create</Button>
      <p>{courses?.map((course) => {
        return <div key={course.id}>{course.title}</div>
      })}</p>
      {/* Change the object ids below to update or delete courses! */}
      <Button onClick={() => updateCall("62250c9eead76a0030969548", updateEx)}>update</Button>
      <Button onClick={() => deleteCall("62217781e11e3a0059c1d591")}>delete</Button>

    </div>
  );
};

export default Dummy;
