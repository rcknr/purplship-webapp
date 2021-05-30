import React, { Fragment, useContext, useEffect, useState } from 'react';
import ConnectProviderModal from '@/components/connect-provider-modal';
import DisconnectProviderButton from '@/components/disconnect-provider-button';
import CarrierBadge from '@/components/carrier-badge';
import { UserConnections, UserConnectionType } from '@/context/user-connections-query';
import ConnectionMutation from '@/context/connection-mutation';
import { Loading } from '@/components/loader';
import { Notify } from '@/components/notifier';
import { NotificationType } from '@/library/types';
import { AppMode, computeMode } from '@/context/app-mode';

interface UserConnectionListView { }

const UserConnectionList: React.FC<UserConnectionListView> = ConnectionMutation<UserConnectionListView>(({ updateConnection }) => {
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { testMode } = useContext(AppMode);
  const { user_connections, loading, refetch } = useContext(UserConnections);
  const [viewOtherMode, showOther] = useState<boolean>(computeMode());

  const update = async (_?: React.MouseEvent) => refetch && await refetch();
  const toggle = ({ __typename, active, id }: UserConnectionType) => async () => {
    try {
      const data = { [__typename.toLowerCase()]: { id, active: !active } };
      await updateConnection({ id, ...data });
      notify({
        type: NotificationType.success,
        message: `carrier connection ${!active ? 'activated' : 'deactivated'}!`
      });
      update();
    } catch (message) {
      notify({ type: NotificationType.error, message });
    }
  };

  useEffect(() => { setLoading(loading); });

  return (
    <Fragment>
      <label className="checkbox p-2" style={{ position: 'absolute', top: 1, right: 1 }}>
        <span className="is-size-7 has-text-weight-semibold has-text-info px-2">Show {testMode ? 'live' : 'test'} connections</span>
        <input id="toggle" type="checkbox" defaultChecked={viewOtherMode} onChange={() => showOther(!viewOtherMode)} />
      </label>
      <table className="table is-fullwidth">

        <thead className="connections-table">
          <tr>
            <th colSpan={4}>Carrier</th>
            <th className="action"></th>
          </tr>
        </thead>

        <tbody className="connections-table">
          {user_connections.map((connection) => (

            <tr key={`${connection.id}-${Date.now()}`} style={{ display: (testMode === connection.test || viewOtherMode === connection.test) ? 'table-row' : 'none' }}>
              <td className="carrier">
                <CarrierBadge carrier={connection.carrier_name} className="box has-text-weight-bold" />
              </td>
              <td className="mode is-vcentered">
                {connection.test && <span className="tag is-warning is-centered">Test</span>}
              </td>
              <td className="active is-vcentered">
                <button className="button is-white is-large" onClick={toggle(connection)}>
                  <span className={`icon is-medium ${connection.active ? 'has-text-success' : 'has-text-grey'}`}>
                    <i className={`fas fa-${connection.active ? 'toggle-on' : 'toggle-off'} fa-lg`}></i>
                  </span>
                </button>
              </td>
              <td className="details">
                <div className="content is-small">
                  <ul>
                    <li>carrier id: <span className="tag is-info is-light" title="carrier nickname">{connection.carrier_id}</span></li>
                  </ul>
                </div>
              </td>
              <td className="action is-vcentered">
                <div className="buttons is-centered">
                  <ConnectProviderModal connection={connection} className="button is-white" onUpdate={update}>
                    <span className="icon is-small">
                      <i className="fas fa-pen"></i>
                    </span>
                  </ConnectProviderModal>
                  <DisconnectProviderButton connection={connection} whenDone={update}>
                    <span className="icon is-small">
                      <i className="fas fa-trash"></i>
                    </span>
                  </DisconnectProviderButton>
                </div>
              </td>
            </tr>

          ))}
        </tbody>

      </table>

      {(user_connections.length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No carriers have been connected yet.</p>
          <p>Use the <strong>Connect a Carrier</strong> button above to add a new connection</p>
        </div>

      </div>}

    </Fragment>
  );
});

export default UserConnectionList;