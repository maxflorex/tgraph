import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

type Props = {};

const Home = (props: Props) => {
    return (
        <>
            <div className="d-flex flex-column gap-3 mb-4">
                <AddProjectModal />
                <AddClientModal />
                <Projects />
                <hr />
                <Clients />
            </div>
        </>
    );
};

export default Home;
