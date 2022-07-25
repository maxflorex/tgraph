import { concat, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/ProjectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import Spinner from './Spinner';

type Props = {};

const AddProjectModal = (props: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    // PROJECT MUTATION
    const [addProject] : any = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects }: any = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    // GET CLIENTS FOR SELECT
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '') {
            return alert('Please fill all fields');
        }

        addProject(name, description, clientId, status);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };

    if (loading) return null;
    if (error) return <p>Something went wrong :(</p>;

    return (
        <div>
            {!loading && !error && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#AddProjectModal"
                    >
                        <div className="d-flex align-items-center">
                            <FaList />
                            New Project
                        </div>
                    </button>
                    <div
                        className="modal fade"
                        id="AddProjectModal"
                        aria-labelledby="AddProjectModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="AddProjectModalLabel"
                                    >
                                        Modal title
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={status}
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                <option value="new">
                                                    Not Started
                                                </option>
                                                <option value="progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Client
                                            </label>
                                            <select
                                                id="clientId"
                                                className="form-select"
                                                value={clientId}
                                                onChange={(e) =>
                                                    setClientId(e.target.value)
                                                }
                                            >
                                                <option value="">
                                                    Select Client
                                                </option>
                                                {data.clients.map(
                                                    (client: any) => (
                                                        <option
                                                            key={client.id}
                                                            value={client.id}
                                                        >
                                                            {client.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddProjectModal;
