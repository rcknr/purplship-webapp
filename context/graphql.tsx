import React, { useContext } from 'react';
import { TokenData } from '@/context/token-query';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { collectToken } from '@/library/helper';

var tokenKey = collectToken();
const httpLink = createHttpLink({ uri: '/graphql' });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: tokenKey ? tokenKey : "",
    }
  }
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
});

const GraphClientContext: React.FC = ({ children }) => {
  const { token } = useContext(TokenData);
  const onUpdate = (key: string) => {
    tokenKey = key;

    return children;
  }; 

  return <>{onUpdate(token.key)}</>;
};

export default GraphClientContext;
