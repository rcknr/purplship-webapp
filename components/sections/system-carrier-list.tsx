import React, { useContext } from 'react';
import CarrierBadge from '@/components/carrier-badge';
import { SystemConnections } from '@/context/system-connections-query';

interface SystemConnectionListView { }

const SystemConnectionList: React.FC<SystemConnectionListView> = () => {
  const { system_connections } = useContext(SystemConnections);

  return (
    <>

      {((system_connections).length > 0) && <table className="table is-fullwidth">

        <tbody className="connections-table">
          <tr>
            <td className="is-size-7" colSpan={4}>ACCOUNTS</td>
            <td className="action"></td>
          </tr>

          {(system_connections || []).map((connection) => (

            <tr key={connection.id}>
              <td className="carrier">
                <CarrierBadge carrier={connection.carrier_name} className="box has-text-weight-bold" />
              </td>
              <td className="mode is-vcentered">
                {connection.test ? <span className="tag is-warning is-centered">Test</span> : <></>}
              </td>
              <td className="details">
                <div className="content is-small">
                  <ul>
                    <li>carrier id: <span className="tag is-info is-light" title="carrier nickname">{connection.carrier_id}</span></li>
                  </ul>
                </div>
              </td>
            </tr>

          ))}
        </tbody>

      </table>}

      {((system_connections).length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>The administrators have not provided any system wide carrier connections.</p>
        </div>

      </div>}

    </>
  );
}

export default SystemConnectionList;