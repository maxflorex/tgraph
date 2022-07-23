import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/Clients';
import AddClientModal from './components/AddClientModal';

// PREVENT CACHE WARNING
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client: any = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <div className="App">
                    <div className="container">
                        <Header />
                        <AddClientModal />
                        <Clients />
                    </div>
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
