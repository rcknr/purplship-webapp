import React, { useContext, useEffect, useState } from 'react';
import CarrierBadge from '@/components/carrier-badge';
import NavLink from '@/components/generic/navlink';
import { View } from '@/library/types';
import { LabelData } from '@/context/shipment-query';
import { formatRef, isNone } from '@/library/helper';
import LabelPrinter from '@/components/label/label-printer';
import AddressDescription from '@/components/descriptions/address-description';
import ParcelDescription from '@/components/descriptions/parcel-description';
import OptionsDescription from '@/components/descriptions/options-description';
import CustomsInfoDescription from '@/components/descriptions/customs-info-description';

interface ShipmentDetailsComponent extends View {
    id?: string;
}

const ShipmentDetails: React.FC<ShipmentDetailsComponent> = ({ id, children }) => {
    const [key] = useState<string>(`shipment-${Date.now()}`);
    const { shipment, loading, loadShipment } = useContext(LabelData);

    useEffect(() => { if (!loading && shipment?.id !== id) loadShipment(id); }, []);

    return (
        <>
            <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
                <ul>
                    <li><NavLink to="/">Shipments</NavLink></li>
                    <li className="is-active"><a href="#" aria-current="page">details</a></li>
                </ul>
            </nav>

            {!isNone(shipment.id) && <div className="card">

                <div className="log-card-header px-5 pt-5 pb-3">
                    <p className="subtitle is-6">Label</p>
                    <p className="title is-5">
                        <span>{shipment.id}</span>
                        <span className="ml-2 tag is-info is-light">
                            {shipment.status?.toString().toUpperCase()}
                        </span>
                    </p>
                </div>

                <div className="card-content py-3">
                    <div className="columns my-0">
                        <div className="column is-3 py-1">Service Courier</div>
                        <div className="column is-8 py-1">
                            <CarrierBadge carrier={((shipment.meta as any)?.rate_provider || shipment.carrier_name) as string} className="tag" />
                        </div>
                    </div>
                    <div className="columns my-0">
                        <div className="column is-3 py-1">Service Level</div>
                        <div className="column is-8 py-1 has-text-weight-semibold">
                            {formatRef(((shipment.selected_rate?.meta as any)?.service_name || shipment.selected_rate?.service) as string)}
                        </div>
                    </div>
                    <div className="columns my-0">
                        <div className="column is-3 py-1">Service Charge</div>
                        <div className="column is-8 py-1 is-subtitle is-size-6 my-1 has-text-weight-semibold has-text-grey">
                            <strong>{shipment.selected_rate?.total_charge} {shipment.selected_rate?.currency}</strong>
                        </div>
                    </div>
                </div>

                <div className="card-content py-3">

                    <div className="is-12 py-1" style={{ display: `${shipment.recipient.address_line1 === undefined ? 'none' : 'block'}` }}>

                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">Shipped To</p>
                        <AddressDescription address={shipment.recipient} />

                    </div>

                    <div className="is-12 py-1" style={shipment.shipper.address_line1 === undefined ? { display: 'none' } : {}}>

                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">Shipped From</p>
                        <AddressDescription address={shipment.shipper} />

                    </div>

                    <div className="is-12 py-1" style={{ display: `${shipment.parcels.length == 0 ? 'none' : 'block'}` }}>

                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">Parcel</p>
                        <ParcelDescription parcel={shipment.parcels[0]} />

                    </div>

                    <div className="is-12 py-1" style={{ display: `${Object.values(shipment.options as object).length === 0 ? 'none' : 'block'}` }}>

                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">Options</p>
                        <OptionsDescription options={shipment.options} />

                    </div>

                    <div className="is-12 py-1" style={{ display: `${isNone(shipment.customs) ? 'none' : 'block'}` }}>

                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">Customs Declaration</p>
                        <CustomsInfoDescription customs={(shipment.customs || {})} />

                    </div>

                </div>

                {!isNone(shipment.label) && <div className="pt-6 pb-4 px-4">
                    <LabelPrinter className="button is-info" shipment={shipment} />
                </div>}

            </div>}

            {isNone(shipment.id) && <div className="card my-6">

                <div className="card-content has-text-centered">
                    <p>Uh Oh!</p>
                    <p>We couldn't find any shipment with that reference</p>
                </div>

            </div>}
        </>
    )
};

export default ShipmentDetails;