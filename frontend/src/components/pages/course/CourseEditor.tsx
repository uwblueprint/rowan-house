import React, { useContext } from "react";
import { useParams } from 'react-router-dom';

const CourseEditor = (): React.ReactElement => {
    const { id }: any = useParams();
    return (
        <div>Course Editor for {id} goes here</div>
    )
}

export default CourseEditor;