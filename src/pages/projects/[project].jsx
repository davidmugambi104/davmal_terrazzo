import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { project } = useParams();

    return (
        <div>
            <h1>Project Detail</h1>
            <p>Details for project: {project}</p>
        </div>
    );
};

export default ProjectDetail;
