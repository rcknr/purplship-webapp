import React, { useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_logs, GET_LOGS, get_logs_logs_edges } from '@/graphql';
import { LogType } from '@/library/types';

const PAGE_SIZE = 20;
const PAGINATION = { offset: 0, first: PAGE_SIZE };

type Edges = (get_logs_logs_edges | null)[];
type LogsType = LazyQueryResult<get_logs, any> & {
  logs: LogType[];
  next?: number | null;
  previous?: number | null;
  load: () => void;
  loadMore: (cursor?: number | null) => void;
};

export const Logs = React.createContext<LogsType>({} as LogsType);

const LogsQuery: React.FC = ({ children }) => {
  const [initialLoad, query] = useLazyQuery<get_logs>(GET_LOGS, { notifyOnNetworkStatusChange: true });
  const [variables, setVariables] = useState<any>(PAGINATION);

  const extract = (edges?: Edges) => (edges || []).map(item => item?.node as LogType);
  const fetchMore = (options: any) => query?.fetchMore && query.fetchMore({
    ...options,
    updateQuery: (previous, { fetchMoreResult, variables }) => {
      const data = fetchMoreResult || previous;
      setVariables(variables);
      return { logs: { ...data.logs, pageInfo: { ...data.logs?.pageInfo, hasPreviousPage: variables?.offset > 0 } } }
    }
  });
  const load = () => query.called ? fetchMore({ variables: PAGINATION }) : initialLoad({ variables });
  const loadMore = (offset?: number | null) => fetchMore({ variables: { ...variables, offset: offset || 0 } });

  return (
    <Logs.Provider value={{
      load, loadMore,
      logs: extract(query?.data?.logs?.edges),
      next: query.data?.logs?.pageInfo?.hasNextPage ? (variables?.offset + PAGE_SIZE) : null,
      previous: query.data?.logs?.pageInfo?.hasPreviousPage ? (variables?.offset - PAGE_SIZE) : null,
      ...query
    }}>
      {children}
    </Logs.Provider>
  );
};

export default LogsQuery;
