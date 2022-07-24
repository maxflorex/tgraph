import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

type Props = {};

const Projects = (props: Props) => {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong :(</p>;

    return (
        <>
            {data.projects.length > 0 ? (
                <div className="row">
                    {data.projects.map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p>No Projects</p>
            )}
        </>
    );
};

export default Projects;
