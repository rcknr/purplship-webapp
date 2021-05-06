import React, { Fragment, useContext, useEffect } from 'react';
import { View } from '@/library/types';
import ConnectProviderModal from '@/components/connect-provider-modal';
import Tabs from '@/components/generic/tabs';
import UserConnectionList from '@/components/sections/user-carrier-list';
import SystemConnectionList from '@/components/sections/system-carrier-list';
import { UserConnections } from '@/components/data/user-connections-query';
import { Loading } from '@/components/loader';
import { SystemConnections } from '@/components/data/system-connections-query';
import ModeIndicator from '@/components/mode-indicator';

interface ConnectionsView extends View {}

const ConnectionsPage: React.FC<ConnectionsView> = ( ) => {
  const { setLoading } = useContext(Loading);
  const user_connections = useContext(UserConnections);
  const system_connections = useContext(SystemConnections);

  const update = async (_?: React.MouseEvent) => user_connections.refetch && await user_connections.refetch();

  useEffect(() => { !user_connections.loading && user_connections.load() }, []);
  useEffect(() => { !system_connections.loading && system_connections.load() }, []);
  useEffect(() => { setLoading(user_connections.loading || system_connections.loading); });

  return (
    <Fragment>
      <ModeIndicator />

      <header className="px-2 pt-1 pb-6">
        <span className="subtitle is-4">Carriers</span>
        <ConnectProviderModal className="button is-success is-pulled-right" onUpdate={update}>
          <span>Connect a Carrier</span>
        </ConnectProviderModal>
      </header>

      <div className="table-container">

        <Tabs tabs={['Your Connections', 'System Connections']} style={{ position: 'relative' }}>

          <UserConnectionList />

          <SystemConnectionList />

        </Tabs>

      </div>

    </Fragment>
  );
}

export default ConnectionsPage;