import React, { useContext, useEffect } from 'react';
import { View } from '@/library/types';
import CarrierBadge from '@/components/carrier-badge';
import { TrackingEvent, TrackingStatus } from '@/api/index';
import TrackShipmentModal from '@/components/track-shipment-modal';
import { isNone } from '@/library/helper';
import { Trackers } from '@/context/trackers-query';
import TrackerMutation from '@/context/tracker-mutation';
import { Loading } from '@/components/loader';
import DeleteItemModal from '@/components/delete-item-modal';
import ModeIndicator from '@/components/mode-indicator';
import TrackingPreview from '@/components/descriptions/tracking-preview';


interface TrackersView extends View { }

const TrackersPage: React.FC<TrackersView> = TrackerMutation<TrackersView>(({ removeTracker }) => {
  const { setLoading } = useContext(Loading);
  const { loading, results, load, loadMore, next, previous, refetch } = useContext(Trackers);

  const update = () => refetch && refetch();
  const remove = (id?: string) => async () => {
    await removeTracker(id as string);
    update();
  };

  useEffect(() => { !loading && load(); }, []);
  useEffect(() => { setLoading(loading); });

  return (
    <>
      <ModeIndicator />

      <header className="px-2 pt-1 pb-6">
        <span className="subtitle is-4">Trackers</span>
        <TrackShipmentModal className="button is-success is-pulled-right" onUpdate={update}>
          <span>Track a Shipment</span>
        </TrackShipmentModal>
      </header>

      {(results.length > 0) && <div className="table-container">
        <table className="table is-fullwidth">

          <tbody className="trackers-table">
            <tr>
              <td className="tracking-number has-text-weight-bold">Tracking No</td>
              <td className="status has-text-centered has-text-weight-bold">status</td>
              <td className="carrier has-text-centered has-text-weight-bold">Carrier</td>
              <td className="last-event has-text-weight-bold">Last Event</td>
              <td className="action"></td>
            </tr>

            {results.map(tracker => (
              <tr key={tracker.id}>
                <td className="tracking-number">
                  <p className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">{tracker.tracking_number}</p>
                </td>
                <td className="status">
                  <strong className={`tag ${statusColor(tracker)}`} style={{ width: '100%', minWidth: '120px' }} >{formatSatus(tracker)}</strong>
                </td>
                <td className="carrier">
                  <CarrierBadge carrier={tracker.carrier_name} className="tag" style={{ width: '100%', minWidth: '120px' }} />
                </td>
                <td className="py-1 last-event">
                  <p className="is-subtitle is-size-7 has-text-weight-semibold text-ellipsis"
                    style={{ width: '300px' }}
                    title={formatEventDescription((tracker.events || [])[0])}>
                    {formatEventDescription((tracker.events || [])[0])}
                  </p>
                  <span className="is-subtitle is-size-7 has-text-weight-semibold has-text-grey">{formatEventDate((tracker.events || [])[0])}</span>
                </td>
                <td className="action is-vcentered p-1">
                  <div className="buttons is-pulled-right">
                    <TrackingPreview tracker={tracker}>
                      <span className="icon is-small">
                        <i className="fas fa-eye"></i>
                      </span>
                    </TrackingPreview>
                    <DeleteItemModal label="Shipment Tracker" identifier={tracker.id as string} onConfirm={remove(tracker.id)}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                    </DeleteItemModal>
                  </div>
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
          <p>No shipment trackers created yet.</p>
          <p>Use the <strong>API</strong> to track your first shipment.</p>
        </div>

      </div>}

    </>
  );
});

function statusColor(tracker: TrackingStatus): string {
  if (tracker.delivered) return 'is-success';
  else if (tracker.pending) return 'is-dark';
  return 'is-info';
}

function formatSatus(tracker: TrackingStatus): string {
  if (tracker.delivered) return 'Delivered';
  else if (tracker.pending) return 'Pending';
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