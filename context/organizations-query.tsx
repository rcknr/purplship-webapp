import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GET_ORGANIZATIONS, get_organizations, get_organizations_organizations } from '@/graphql';
import { getCookie, isNone } from '@/library/helper';


export type OrganizationType = get_organizations_organizations;

type OrganizationsQueryResult = LazyQueryResult<get_organizations, any> & {
  organizations: OrganizationType[];
  organization: OrganizationType;
  load: () => void;
};

export const Organizations = React.createContext<OrganizationsQueryResult>({} as OrganizationsQueryResult);

const OrganizationsQuery: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<get_organizations>(GET_ORGANIZATIONS);
  const [organization, setCurrent] = useState<OrganizationType>({} as OrganizationType);

  const extract = (results: any[]): OrganizationType[] => (results).filter(r => r !== null);
  const load = () => result.called ? result.fetchMore({}) : initialLoad({});

  useEffect(() => {
    let organizations = extract(result.data?.organizations || []);
    if ((organizations || []).length > 0) {
      const currentOrgId = getCookie("org_id");
      const current = organizations.find(org => org.id === currentOrgId)
      !isNone(current) && setCurrent(current as OrganizationType);
    }
  });

  return (
    <Organizations.Provider value={{ load, organization, organizations: extract(result.data?.organizations || []), ...result }}>
      {children}
    </Organizations.Provider>
  );
};

export default OrganizationsQuery;
