import React, { useRef, useState } from 'react';
import { TrackingEvent, TrackingStatus } from '@/api/index';
import CarrierBadge from '@/components/carrier-badge';

type DayEvents = { [k: string]: TrackingEvent[] };

interface TrackingPreviewComponent {
    tracker: TrackingStatus;
}

const TrackingPreview: React.FC<TrackingPreviewComponent> = ({ tracker, children }) => {
    const link = useRef<HTMLAnchorElement>(null);
    const linkShare = useRef<HTMLInputElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [key, setKey] = useState<string>(`tracker-${Date.now()}`);

    const dismiss = (_?: React.MouseEvent) => {
        setKey(`tracker-${Date.now()}`);
        setIsActive(false);
    };
    const copy = (_: React.MouseEvent) => {
        linkShare.current?.select();
        document.execCommand("copy");
    };
    const computeColor = (tracker: TrackingStatus) => {
        if (tracker.delivered) return "has-background-success";
        else if ((tracker.events || []).length === 0) return "has-background-grey-dark";
        else return "has-background-info";
    };
    const computeStatus = (tracker: TrackingStatus) => {
        if (tracker.delivered) return "Delivered";
        else if ((tracker.events || []).length === 0) return "Pending";
        else return "In-Transit";
    };
    const computeEvents = (tracker: TrackingStatus): DayEvents => {
        return (tracker.events || []).reduce((days, event: TrackingEvent) => {
            const daydate = new Date(event.date as string).toUTCString().split(' ').slice(0, 4).join(' ');
            return { ...days, [daydate]: [...(days[daydate] || []), event] };
        }, {} as DayEvents);
    };

    return (
        <>
            <button className="button is-white" onClick={() => setIsActive(true)}>
                {children}
            </button>

            <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
                <div className="modal-background" onClick={dismiss}></div>

                <div className="modal-card">
                    <section className="modal-card-body">
                        <p className="has-text-centered pb-4">
                            <CarrierBadge carrier={tracker.carrier_name} className="tag" />
                        </p>

                        <p className="subtitle has-text-centered is-6">
                            <span>Tracking ID</span> <strong>{tracker.tracking_number}</strong>
                        </p>

                        <p className={computeColor(tracker) + " block has-text-centered has-text-white is-size-4 py-3"}>
                            {computeStatus(tracker)}
                        </p>

                        <hr />

                        <div className="my-3 pl-6" style={{ maxHeight: '40vh', overflowY: 'scroll' }}>

                            <aside className="menu">
                                <ul className="menu-list mb-5" style={{ maxWidth: "28rem;" }}>
                                    {Object.entries(computeEvents(tracker)).map(([day, events]) => <li>
                                        <p className="menu-label is-size-6 is-capitalized">{day}</p>

                                        {events.map((event) => <ul>
                                            <li className="my-2">
                                                <code>{event.time}</code>
                                                <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold">{event.location}</span>
                                            </li>
                                            <li className="my-2">
                                                <span className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">{event.description}</span>
                                            </li>
                                        </ul>)}

                                    </li>)}
                                </ul>
                            </aside>

                        </div>

                        <hr />

                        <div className="field">
                            <div className="control">
                                <label className="label">Share with customer</label>
                                <input
                                    className="input is-small" type="text" title="Click to Copy"
                                    defaultValue={link.current?.href} ref={linkShare} style={{ width: '80%' }}
                                    readOnly />
                                <button className="button is-small is-light mx-1" onClick={copy}>
                                    <span className="icon is-small"><i className="fas fa-copy"></i></span>
                                </button>
                                <a className="button is-small is-light" href={`/tracking/${tracker.id}`} ref={link} target="blank">
                                    <span className="icon is-small"><i className="fas fa-share-square"></i></span>
                                </a>
                            </div>
                        </div>

                    </section>
                </div>

                <button className="modal-close is-large" aria-label="close" onClick={dismiss}></button>

            </div>
        </>
    )
};

export default TrackingPreview;