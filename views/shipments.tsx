import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import ShipmentMenu from '@/components/shipment-menu';
import { formatAddress, formatDate, isNone } from '@/library/helper';
import CarrierBadge from '@/components/carrier-badge';
import ShipmentMutation from '@/context/shipment-mutation';
import { Shipments } from '@/context/shipments-query';
import { Loading } from '@/components/loader';
import ModeIndicator from '@/components/mode-indicator';
import NavLink from '@/components/generic/navlink';


interface ShipmentsView extends View { }

const ShipmentPage: React.FC<ShipmentsView> = ShipmentMutation<ShipmentsView>(() => {
  const { setLoading } = useContext(Loading);
  const { loading, results, load, loadMore, previous, next } = useContext(Shipments);

  useEffect(() => { !loading && load(); }, []);
  useEffect(() => { setLoading(loading); }, [loading]);

  return (
    <>
      <ModeIndicator />

      <header className="px-2 pt-1 pb-6">
        <span className="subtitle is-4">Shipments</span>
        <NavLink className="button is-success is-pulled-right" to="/buy_label/new">
          <span>Create Label</span>
        </NavLink>
      </header>

      {(results.length > 0) && <div className="table-container">
        <table className="table is-fullwidth">
          <tbody>

            <tr>
              <td className="carrier has-text-centered has-text-weight-bold">Carriers</td>
              <td className="recipient has-text-weight-bold">Recipient</td>
              <td className="creation has-text-centered has-text-weight-bold">Created</td>
              <td className="status has-text-centered has-text-weight-bold">Status</td>
              <td className="action"></td>
            </tr>

            {results.map(shipment => (
              <tr key={shipment.id}>
                <td className="carrier is-vcentered">
                  <CarrierBadge carrier={((shipment.meta as any)?.rate_provider || shipment.carrier_name) as string} className="tag" style={{ width: '100%', minWidth: '120px' }} />
                </td>
                <td className="recipient is-vcentered">
                  <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold has-text-grey">{formatAddress(shipment.recipient)}</p>
                </td>
                <td className="creation is-vcentered has-text-centered">
                  <p className="is-subtitle is-size-6 my-1 has-text-weight-semibold has-text-grey">{formatDate(shipment.created_at)}</p>
                </td>
                <td className="status is-vcentered">
                  <span className="tag is-info is-light has-text-weight-semibold" style={{ width: '100%' }}>{shipment.status?.toString().toUpperCase()}</span>
                </td>
                <td className="action is-vcentered">
                  <ShipmentMenu shipment={shipment} style={{ width: '100%' }} />
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        <footer className="px-2 py-2 is-vcentered">
          <span className="is-size-7 has-text-weight-semibold">{results.length} results</span>

          <div className="buttons has-addons is-centered is-pulled-right">
            <button className="button is-small" onClick={() => loadMore(previous)} disabled={isNone(previous)}>
              <span>Previous</span>
            </button>
            <button className="button is-small" onClick={() => loadMore(next)} disabled={isNone(next)}>
              <span>Next</span>
            </button>
          </div>
        </footer>

      </div>}

      {(!loading && results.length == 0) && <div className="card my-6">

        <div className="card-content has-text-centered">
          <p>No shipment has been created yet.</p>
          <p>Use the <strong>API</strong> to create your first shipment.</p>
        </div>

      </div>}

    </>
  );
});

export default ShipmentPage;