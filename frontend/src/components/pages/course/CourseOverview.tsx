import React, { useContext } from "react";
import { useParams } from 'react-router-dom';

const CourseOverview = (): React.ReactElement => {
    const {id}: any = useParams();
    return (
        <div>Course Overview for {id} goes here</div>
    )
}

export default CourseOverview;