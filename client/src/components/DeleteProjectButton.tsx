import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/ProjectMutations';

type Props = {
    projectId: string;
};

const DeleteProjectButton = ({ projectId }: Props) => {
    const navigate = useNavigate();

    const [deleteProject] : any = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }],
      });

    return (
        <div>
            <div className="d-flex mt-5 ms-auto">
                <button className="btn btn-danger m-2" onClick={deleteProject}>
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteProjectButton;
