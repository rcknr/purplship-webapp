import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import ShipmentMenu from '@/components/shipment-menu';
import { formatAddress, formatDateTime, formatRef, isNone, shipmentCarrier } from '@/library/helper';
import ShipmentMutation from '@/context/shipment-mutation';
import { Shipments } from '@/context/shipments-query';
import { Loading } from '@/components/loader';
import ModeIndicator from '@/components/mode-indicator';
import NavLink from '@/components/generic/navlink';
import { useLocation, useNavigate } from '@reach/router';
import StatusBadge from '@/components/status-badge';
import Spinner from '@/components/spinner';
import { ListStatusEnum } from '@/api/apis/ShipmentsApi';
import LabelPrinter from '@/components/label/label-printer';
import { AppMode } from '@/context/app-mode';
import CustomInvoicePrinter from '@/components/descriptions/custom-invoice-printer';


interface ShipmentsView extends View { }

const ShipmentPage: React.FC<ShipmentsView> = ShipmentMutation<ShipmentsView>(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading } = useContext(Loading);
  const { basePath } = useContext(AppMode);
  const { loading, results, load, loadMore, previous, next, called } = useContext(Shipments);
  const [status, setStatus] = React.useState<ListStatusEnum>();

  const viewShipment = (id: string) => (_: React.MouseEvent) => {
    navigate(`${basePath}/shipments/` + id);
  };

  useEffect(() => { setLoading(loading); }, [loading]);
  useEffect(() => {
    const newStatus = (new URLSearchParams(location.search)).get('status') as ListStatusEnum || undefined;

    setStatus(newStatus);
    (!loading) && (called ? loadMore : load)({ status: newStatus, cursor: '' });
  }, [location.search]);

  return (
    <LabelPrinter>
      <CustomInvoicePrinter>
        <ModeIndicator />

        <header className="px-2 pt-1 pb-4">
          <span className="title is-4">Shipments</span>
          <NavLink className="button is-success is-pulled-right" to="/buy_label/new">
            <span>Create Label</span>
          </NavLink>
        </header>

        <div className="tabs">
          <ul>
            <li className={`is-capitalized has-text-weight-semibold ${isNone(status) ? 'is-active' : ''}`}>
              <NavLink to="">all</NavLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'created' ? 'is-active' : ''}`}>
              <NavLink to="?status=created">created</NavLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'purchased' ? 'is-active' : ''}`}>
              <NavLink to="?status=purchased">purchased</NavLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'delivered' ? 'is-active' : ''}`}>
              <NavLink to="?status=delivered">delivered</NavLink>
            </li>
            <li className={`is-capitalized has-text-weight-semibold ${status === 'cancelled' ? 'is-active' : ''}`}>
              <NavLink to="?status=cancelled">cancelled</NavLink>
            </li>
          </ul>
        </div>

        {loading && <Spinner />}

        {(!loading && results.length > 0) && <div className="table-container">
          <table className="shipments-table table is-fullwidth">
            <tbody>

              <tr>
                <td className="carrier is-size-7 has-text-centered">CARRIER</td>
                <td className="service is-size-7">SERVICE</td>
                <td className="status"></td>
                <td className="recipient is-size-7">RECIPIENT</td>
                <td className="date is-size-7">DATE</td>
                <td className="action"></td>
              </tr>

              {results.map(shipment => (
                <tr key={shipment.id} className="items" onClick={viewShipment(shipment.id as string)}>
                  <td className="carrier is-vcentered has-text-centered">
                    {!isNone(shipment.carrier_name) &&
                      <img src={`/static/carriers/${shipmentCarrier(shipment)}_logo.svg`} style={{ height: "25px" }} />
                    }
                    {isNone(shipment.carrier_name) &&
                      <img src={`/static/branding/logo.svg`} style={{ height: "25px" }} />
                    }
                  </td>
                  <td className="service is-vcentered p-1">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">
                      {!isNone(shipment.carrier_name) && formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                      {isNone(shipment.carrier_name) && "NOT COMPLETED"}
                    </p>
                  </td>
                  <td className="status is-vcentered">
                    <StatusBadge status={shipment.status} style={{ width: '100%' }} />
                  </td>
                  <td className="recipient is-vcentered">
                    <p className="is-size-7 has-text-weight-bold has-text-grey">{formatAddress(shipment.recipient)}</p>
                  </td>
                  <td className="date is-vcentered">
                    <p className="is-size-7 has-text-weight-semibold has-text-grey">{formatDateTime(shipment.created_at)}</p>
                  </td>
                  <td className="action is-vcentered px-0">
                    <ShipmentMenu shipment={shipment} onClick={e => e.stopPropagation()} className="is-pulled-right" style={{ width: '150px' }} />
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

          <footer className="px-2 py-2 is-vcentered">
            <span className="is-size-7 has-text-weight-semibold">{results.length} results</span>

            <div className="buttons has-addons is-centered is-pulled-right">
              <button className="button is-small" onClick={() => loadMore({ cursor: previous, status })} disabled={isNone(previous)}>
                <span>Previous</span>
              </button>
              <button className="button is-small" onClick={() => loadMore({ cursor: next, status })} disabled={isNone(next)}>
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

      </CustomInvoicePrinter>
    </LabelPrinter>
  );
});

export default ShipmentPage;