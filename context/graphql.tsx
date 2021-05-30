import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({ uri: '/graphql' });

export const graphqlClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({ addTypename: false })
});


const GraphClient = React.createContext<ApolloClient<any>>(graphqlClient);

const GraphClientContext: React.FC = ({ children }) => (
    <GraphClient.Provider value={graphqlClient}>{children}</GraphClient.Provider>
);

export default GraphClientContext;
