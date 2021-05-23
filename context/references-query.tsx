import React, { useContext, useEffect, useState } from 'react';
import { References } from '@/api/index';
import { isNone } from '@/library/helper';
import { RestClient } from '@/context/rest';


export const APIReference = React.createContext<References>({} as References);

const APIReferenceQuery: React.FC = ({ children }) => {
  const purplship = useContext(RestClient);
  const [references, setValue] = useState<References>({} as References);

  useEffect(() => { if (!isNone(purplship)) purplship.API.data().then(setValue); }, [purplship]);

  return (
    <APIReference.Provider value={references}>{children}</APIReference.Provider>
  );
};

export default APIReferenceQuery;
