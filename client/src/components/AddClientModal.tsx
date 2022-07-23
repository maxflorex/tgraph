import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

type Props = {};

const AddClientModal = (props: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    type addType = {
        name: string;
        phone: string;
        email: string;
      };

    const [addClient]  = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients }: any = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        },
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (name === '' || phone === '' || email === '') {
            return alert('Please fill all fields');
        }

        addClient(name, email, phone);

        setName('');
        setPhone('');
        setEmail('');
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModal"
            >
                Add Client
            </button>
            <div
                className="modal fade"
                id="addClientModal"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addClientModalLabel"
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
                                    <label className="form-label">Name</label>
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
                                    <label className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClientModal;
