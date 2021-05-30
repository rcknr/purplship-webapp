import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GetToken, GetToken_token, GET_TOKEN } from '@/graphql';
import { collectToken } from '@/library/helper';

export type TokenType = GetToken_token;
type TokenDataType = LazyQueryResult<GetToken, any> & {
  token: TokenType;
  load: () => any;
  authenticateOrg: (org_id: string, token: string) => Promise<any | undefined>
};

export const TokenData = React.createContext<TokenDataType>({ token: { key: collectToken() } } as TokenDataType);

const TokenQuery: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<GetToken>(GET_TOKEN, { notifyOnNetworkStatusChange: true });

  const fetchMore = (options: any) => result.called ? result.fetchMore(options) : initialLoad(options);
  const load = () => result.called ? fetchMore({}) : initialLoad({});
  const authenticateOrg = async (org_id: string, token: string) => {
    return fetchMore({
      variables: { org_id },
      context: { headers: { "X-org-id": org_id, authorization: `Token ${token}` } }
    })
  };

  return (
    <TokenData.Provider value={{ load, authenticateOrg, token: (result?.data?.token || {} as TokenType), ...result }}>
      {children}
    </TokenData.Provider>
  );
};

export default TokenQuery;
