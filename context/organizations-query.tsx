import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GET_ORGANIZATIONS, get_organizations, get_organizations_organizations } from '@/graphql';


export type OrganizationType = get_organizations_organizations;

type OrganizationsQueryResult = LazyQueryResult<get_organizations, any> & {
  organizations: OrganizationType[];
  load: () => void;
};

export const Organizations = React.createContext<OrganizationsQueryResult>({} as OrganizationsQueryResult);

const OrganizationsQuery: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<get_organizations>(GET_ORGANIZATIONS);

  const extract = (results: any[]): OrganizationType[] => (results).filter(r => r !== null);
  const load = () => result.called ? result.fetchMore({}) : initialLoad({});

  return (
    <Organizations.Provider  value={{ load, organizations: extract(result.data?.organizations || []), ...result }}>
      {children}
    </Organizations.Provider>
  );
};

export default OrganizationsQuery;
