import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import ConnectProviderModal, { ConnectProviderModalContext } from '@/components/connect-provider-modal';
import Tabs from '@/components/generic/tabs';
import UserConnectionList from '@/components/sections/user-carrier-list';
import SystemConnectionList from '@/components/sections/system-carrier-list';
import { UserConnections } from '@/context/user-connections-query';
import { Loading } from '@/components/loader';
import { SystemConnections } from '@/context/system-connections-query';
import ModeIndicator from '@/components/mode-indicator';
import ConfirmModal from '@/components/confirm-modal';

interface ConnectionsView extends View { }

const ConnectionsPage: React.FC<ConnectionsView> = () => {
  const { setLoading } = useContext(Loading);
  const {refetch, ...user_connections} = useContext(UserConnections);
  const system_connections = useContext(SystemConnections);

  const onUpdate = async () => refetch && await refetch();

  useEffect(() => { !user_connections.loading && user_connections.load() }, []);
  useEffect(() => { !system_connections.loading && system_connections.load() }, []);
  useEffect(() => { setLoading(user_connections.loading || system_connections.loading); });

  return (
    <ConfirmModal>
      <ConnectProviderModal>
        <ConnectProviderModalContext.Consumer>{({ editConnection }) => (<>
          <ModeIndicator />

          <header className="px-2 pt-1 pb-4">
            <span className="title is-4">Carriers</span>
            <button className="button is-success is-pulled-right" onClick={() => editConnection({ onConfirm: onUpdate })}>
              <span>Connect a Carrier</span>
            </button>
          </header>

          <div className="table-container">

            <Tabs tabs={['Your Connections', 'System Connections']} tabClass="is-capitalized has-text-weight-semibold" style={{ position: 'relative' }}>

              <UserConnectionList />

              <SystemConnectionList />

            </Tabs>

          </div>

        </>)}</ConnectProviderModalContext.Consumer>
      </ConnectProviderModal>
    </ConfirmModal>
  );
}

export default ConnectionsPage;