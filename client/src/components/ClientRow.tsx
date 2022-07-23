import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

type Props = {
    client: any;
};

const ClientRow = ({ client }: Props) => {
    const [deleteClient]: any = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        
        //* REFRESH AFTER DELITING ITEM
        // OPTION 1 - NOT RECOMMENDED
        // refetchQueries: [{ query: GET_CLIENTS }],

        // OPTION 2 - RECOMMENDED
        update(cache, { data: { deleteClient } }) {
            const { clients }: any = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter(
                        (client: any) => client.id !== deleteClient.id
                    ),
                },
            });
        },
    });

    return (
        <>
            <tr>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={deleteClient}
                    >
                        <FaTrash />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default ClientRow;
