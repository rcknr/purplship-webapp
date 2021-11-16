import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import { TrackingEvent, TrackingStatus } from '@/api/index';
import TrackShipmentModal from '@/components/track-shipment-modal';
import { isNone } from '@/library/helper';
import { Trackers } from '@/context/trackers-query';
import TrackerMutation from '@/context/tracker-mutation';
import { Loading } from '@/components/loader';
import ModeIndicator from '@/components/mode-indicator';
import TrackingPreview, { TrackingPreviewContext } from '@/components/descriptions/tracking-preview';
import Spinner from '@/components/spinner';
import NavLink from '@/components/generic/navlink';
import { ListStatusEnum } from '@/api/apis/TrackersApi';
import StatusBadge from '@/components/status-badge';
import ConfirmModal, { ConfirmModalContext } from '@/components/confirm-modal';

const CONTEXT_WRAPPERS = [TrackingPreview, ConfirmModal];

const NestedContexts: React.FC = ({ children }) => {
  const CTX = CONTEXT_WRAPPERS.reduce((_, Ctx) => <Ctx>{_}</Ctx>, children);
  return <>{CTX}</>;
};


interface TrackersView extends View { }

const TrackersPage: React.FC<TrackersView> = TrackerMutation<TrackersView>(({ removeTracker }) => {
  const { setLoading } = useContext(Loading);
  const { loading, results, called, load, loadMore, next, previous, refetch } = useContext(Trackers);
  const [status, setStatus] = React.useState<ListStatusEnum>();

  const update = () => refetch && refetch();
  const remove = (id?: string) => async () => {
    await removeTracker(id as string);
    update();
  };

  useEffect(() => { setLoading(loading); });
  useEffect(() => {
    const newStatus = (new URLSearchParams(location.search)).get('status') as ListStatusEnum || undefined;

    setStatus(newStatus);
    (!loading) && (called ? loadMore : load)({ status: newStatus, cursor: '' });
  }, [location.search]);

  return (
    <NestedContexts>
      <TrackingPreviewContext.Consumer>{({ previewTracker }) => <>
        <ConfirmModalContext.Consumer>{({ confirmDeletion }) => <>
          <ModeIndicator />

          <header className="px-2 pt-1 pb-4">
            <span className="title is-4">Trackers</span>
            <TrackShipmentModal className="button is-success is-pulled-right" onUpdate={update}>
              <span>Track a Shipment</span>
            </TrackShipmentModal>
          </header>

          <div className="tabs">
            <ul>
              <li className={`is-capitalized has-text-weight-semibold ${isNone(status) ? 'is-active' : ''}`}>
                <NavLink to="/trackers">all</NavLink>
              </li>
              <li className={`is-capitalized has-text-weight-semibold ${status === 'in-transit' ? 'is-active' : ''}`}>
                <NavLink to="/trackers?status=in-transit">in-tansit</NavLink>
              </li>
              <li className={`is-capitalized has-text-weight-semibold ${status === 'pending' ? 'is-active' : ''}`}>
                <NavLink to="/trackers?status=pending">pending</NavLink>
              </li>
              <li className={`is-capitalized has-text-weight-semibold ${status === 'delivered' ? 'is-active' : ''}`}>
                <NavLink to="/trackers?status=delivered">delivered</NavLink>
              </li>
            </ul>
          </div>

          {loading && <Spinner />}

          {(!loading && results.length > 0) && <div className="table-container">
            <table className="trackers-table table is-fullwidth">

              <tbody className="trackers-table">
                <tr>
                  <td className="carrier is-size-7 has-text-centered">CARRIER</td>
                  <td className="tracking-number is-size-7">TRACKING NUMBER</td>
                  <td className="status"></td>
                  <td className="last-event is-size-7">LAST EVENT</td>
                  <td className="date is-size-7"></td>
                  <td className="action"></td>
                </tr>

                {results.map(tracker => (
                  <tr key={tracker.id} className="items" onClick={() => previewTracker(tracker)}>
                    <td className="carrier is-vcentered has-text-centered">
                      <img src={`/static/carriers/${tracker.carrier_name}_logo.svg`} style={{ height: "25px" }} />
                    </td>
                    <td className="tracking-number is-vcentered p-1">
                      <p className="is-subtitle is-size-7 has-text-weight-semibold has-text-info">{tracker.tracking_number}</p>
                    </td>
                    <td className="status is-vcentered">
                      <StatusBadge status={tracker.status} style={{ width: '100%' }} />
                    </td>
                    <td className="last-event is-vcentered py-1 last-event">
                      <p className="is-size-7 has-text-weight-bold has-text-grey text-ellipsis"
                        style={{ width: '300px' }}
                        title={formatEventDescription((tracker.events || [])[0])}>
                        {formatEventDescription((tracker.events || [])[0])}
                      </p>
                    </td>
                    <td className="date is-vcentered has-text-right">
                      <p className="is-size-7 has-text-weight-semibold has-text-grey">{formatEventDate((tracker.events || [])[0])}</p>
                    </td>
                    <td className="action is-vcentered p-1">
                      <button className="button is-white is-pulled-right"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeletion({ label: "Shipment Tracker", identifier: tracker.id as string, onConfirm: remove(tracker.id) })
                        }}>
                        <span className="icon is-small">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
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
              <p>No shipment trackers found.</p>

              {isNone(status) && <p>Use the <strong>API</strong> to track your first shipment.</p>}
            </div>

          </div>}

        </>}</ConfirmModalContext.Consumer>
      </>}</TrackingPreviewContext.Consumer>
    </NestedContexts>
  );
});

function statusColor(tracker: TrackingStatus): string {
  if (tracker.delivered) return 'is-success';
  else if (tracker.status === ListStatusEnum.Pending.toString()) return 'is-dark';
  return 'is-info';
}

function formatSatus(tracker: TrackingStatus): string {
  if (tracker.delivered) return 'Delivered';
  else if (tracker.status === ListStatusEnum.Pending.toString()) return 'Pending';
  return 'In Transit';
}

function formatEventDescription(last_event?: TrackingEvent): string {
  return last_event?.description || '';
}

function formatEventDate(last_event?: TrackingEvent): string {
  if (isNone(last_event)) return '';

  return [
    last_event?.date,
    last_event?.time
  ].filter(a => !isNone(a) && a !== "").join(" ");
}

export default TrackersPage;
