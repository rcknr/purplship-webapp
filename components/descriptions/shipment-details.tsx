import React, { useContext, useEffect, useState } from 'react';
import { View } from '@/library/types';
import { LabelData } from '@/context/shipment-query';
import { formatAddressLocation, formatCustomsLabel, formatDate, formatDateTime, formatDimension, formatParcelLabel, formatRef, formatWeight, isNone, shipmentCarrier } from '@/library/helper';
import LabelPrinter, { LabelPrinterContext } from '@/components/label/label-printer';
import CustomInvoicePrinter, { CustomInvoicePrinterContext } from '@/components/descriptions/custom-invoice-printer';
import { useNavigate } from '@reach/router';
import { AppMode } from '@/context/app-mode';
import StatusBadge from '@/components/status-badge';
import { Customs, ShipmentStatusEnum } from '@/api/index';
import ModeIndicator from '@/components/mode-indicator';

interface ShipmentDetailsComponent extends View {
    id?: string;
}

const ShipmentDetails: React.FC<ShipmentDetailsComponent> = ({ id }) => {
    const navigate = useNavigate();
    const { basePath } = useContext(AppMode);
    const [key] = useState<string>(`shipment-${Date.now()}`);
    const { shipment, loading, loadShipment } = useContext(LabelData);

    const buyLabel = (_: React.MouseEvent) => {
        navigate(basePath + '/buy_label/' + shipment.id);
    };
    const copyId = (_: React.MouseEvent) => {
        var input = document.createElement('input');
        input.setAttribute('value', shipment.id as string);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };

    useEffect(() => { if (!loading && shipment?.id !== id) loadShipment(id); }, []);

    return (
        <LabelPrinter>
            <CustomInvoicePrinter>
                <ModeIndicator />
                <LabelPrinterContext.Consumer>{({ printLabel }) => <>
                    <CustomInvoicePrinterContext.Consumer>{({ printInvoice }) => <>

                        {!isNone(shipment.id) && <>
                            <div className="columns my-1">
                                <div className="column is-6">
                                    <span className="subtitle is-size-7 has-text-weight-semibold">SHIPMENT</span>
                                    <br />
                                    <span className="title is-4 mr-2">{shipment.tracking_number || "NOT COMPLETED"}</span>
                                    <StatusBadge status={shipment.status} />
                                </div>

                                <div className="column is-6 has-text-right pb-0">
                                    <a className="button is-white is-small"
                                        style={{ padding: '0', height: '20px' }}
                                        data-id={shipment.id}
                                        onClick={copyId}
                                        title="Copy ID">
                                        <span className="mr-1">{shipment.id}</span>
                                        <i className="fas fa-clipboard"></i>
                                    </a>
                                    <br />
                                    {!isNone(shipment.label) && <button className="button is-default is-small ml-1" onClick={() => printLabel(shipment)}>
                                        <i className="fas fa-print"></i>
                                        <span className="ml-1">Print Label</span>
                                    </button>}
                                    {!isNone((shipment?.meta as any).custom_invoice) && <button className="button is-default is-small ml-1" onClick={() => printInvoice(shipment)}>
                                        <i className="fas fa-print"></i>
                                        <span className="ml-1">Print Invoice</span>
                                    </button>}
                                    {(isNone(shipment.label) && shipment.status === ShipmentStatusEnum.Created) &&
                                        <button className="button is-default is-small ml-1" onClick={buyLabel}>Buy Label</button>}
                                </div>
                            </div>

                            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

                            <div className="columns mb-4">
                                <div className="p-4 mr-4">
                                    <span className="subtitle is-size-7 my-4">Date</span><br />
                                    <span className="subtitle is-size-7 has-text-weight-semibold">{formatDateTime(shipment.created_at)}</span>
                                </div>

                                {!isNone(shipment.service) && <>
                                    <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
                                    <div className="p-4 mr-4">
                                        <span className="subtitle is-size-7 my-4">Courier</span><br />
                                        <img src={`/static/carriers/${shipmentCarrier(shipment)}_logo.svg`} style={{ width: "100px" }} className="mt-1" />
                                    </div>

                                    <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
                                    <div className="p-4 mr-4">
                                        <span className="subtitle is-size-7 my-4">Service Level</span><br />
                                        <span className="subtitle is-size-7 has-text-weight-semibold">
                                            {((shipment.meta as any)?.rate_provider !== shipment.carrier_name) && <span>{formatRef(shipment.carrier_name as string)} </span>}
                                            {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                                        </span>
                                    </div>
                                </>}

                                {!isNone(shipment.reference) && <>
                                    <div className="my-2" style={{ width: '1px', backgroundColor: '#ddd' }}></div>
                                    <div className="p-4 mr-4">
                                        <span className="subtitle is-size-7 my-4">Reference</span><br />
                                        <span className="subtitle is-size-7 has-text-weight-semibold">{shipment.reference}</span>
                                    </div>
                                </>}
                            </div>

                            {!isNone(shipment.selected_rate) && <>

                                <h2 className="title is-5 my-4">Service Details</h2>
                                <hr className="mt-1 mb-2" style={{ height: '1px' }} />

                                <div className="mt-3 mb-6">

                                    <div className="columns my-0">
                                        <div className="column is-6 is-size-6 py-1">
                                            <div className="column is-4 is-size-6 py-1">Service Level</div>
                                            <div className="column is-size-6 has-text-weight-semibold py-1">
                                                {((shipment.meta as any)?.rate_provider !== shipment.carrier_name) && <span>{formatRef(shipment.carrier_name as string)} </span>}
                                                {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                                            </div>
                                        </div>

                                        <div className="column is-6 is-size-6 py-1">
                                            {(shipment.selected_rate?.extra_charges || []).map(charge => <>
                                            
                                            </>)}
                                        </div>
                                    </div>


                                    <div className="columns my-0">
                                        <div className="column is-3 is-size-6 py-1">Service Level</div>
                                        <div className="column is-size-6 has-text-weight-semibold py-1">
                                            {((shipment.meta as any)?.rate_provider !== shipment.carrier_name) && <span>{formatRef(shipment.carrier_name as string)} </span>}
                                            {formatRef(((shipment.meta as any)?.service_name || shipment.service) as string)}
                                        </div>
                                    </div>
                                    <div className="columns my-0">
                                        <div className="column is-3 is-size-6 py-1">Cost</div>
                                        <div className="column is-size-6 py-1">
                                            <span className="has-text-weight-semibold mr-1">{shipment.selected_rate?.total_charge}</span>
                                            <span>{shipment.selected_rate?.currency}</span>
                                        </div>
                                    </div>
                                </div>

                            </>}


                            <h2 className="title is-5 my-4">Shipment Details</h2>
                            <hr className="mt-1 mb-2" style={{ height: '1px' }} />

                            <div className="mt-3 mb-6">

                                <div className="columns my-0">
                                    <div className="column is-6 is-size-6 py-1">
                                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">ADDRESS</p>

                                        <p className="is-size-6 my-1">{shipment.recipient.person_name}</p>
                                        <p className="is-size-6 my-1">{shipment.recipient.company_name}</p>
                                        <p className="is-size-6 my-1 has-text-info">{shipment.recipient.email}</p>
                                        <p className="is-size-6 my-1 has-text-info">{shipment.recipient.phone_number}</p>
                                        <p className="is-size-6 my-1">
                                            <span>{shipment.recipient.address_line1}</span>
                                            {!isNone(shipment.recipient.address_line2) && <span>{shipment.recipient.address_line2}</span>}
                                        </p>
                                        <p className="is-size-6 my-1">{formatAddressLocation(shipment.recipient)}</p>
                                    </div>

                                    <div className="column is-6 is-size-6 py-1">
                                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">PARCELS</p>

                                        {shipment.parcels.map((parcel) => <>
                                            <hr className="mt-1 mb-2" style={{ height: '1px' }} />
                                            <p className="is-size-7 my-1">{formatParcelLabel(parcel)}</p>
                                            <p className="is-size-7 my-1 has-text-grey">{formatDimension(parcel)}</p>
                                            <p className="is-size-7 my-1 has-text-grey">{formatWeight(parcel)}</p>
                                        </>)}
                                    </div>
                                </div>

                                <div className="columns mt-6 mb-0">
                                    {!isNone(shipment.customs) && <div className="column is-6 is-size-6 py-1">
                                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">CUSTOMS DECLARATION</p>

                                        <p className="is-size-6 my-1">{formatCustomsLabel(shipment.customs as Customs)}</p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.aes) ? '' : <span>AES: <strong>{shipment.customs?.aes}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.eel_pfc) ? '' : <span>EEL / PFC: <strong>{shipment.customs?.eel_pfc}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.invoice) ? '' : <span>Invoice Number: <strong>{shipment.customs?.invoice}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.invoice_date) ? '' : <span>Invoice Date: <strong>{shipment.customs?.invoice_date}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.certificate_number) ? '' : <span>Certificate Number: <strong>{shipment.customs?.certificate_number}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.duty) ? '' : <span>Duties paid by <strong>{formatRef('' + shipment.customs?.duty?.paid_by)}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {!shipment.customs?.certify ? '' : <span>Certified and Signed By <strong>{shipment.customs.signer}</strong></span>}
                                        </p>
                                        <p className="is-size-6 my-1 has-text-grey">
                                            {isNone(shipment.customs?.content_description) ? '' : <span><strong>Content:</strong> {shipment.customs?.content_description}</span>}
                                        </p>
                                    </div>}

                                    {(Object.values(shipment.options as object).length > 0) && <div className="column is-6 is-size-6 py-1">
                                        <p className="is-title is-size-6 my-2 has-text-weight-semibold">SHIPMENT OPTIONS</p>

                                        {[shipment.options].map((options: any) => <>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.shipment_date) ? '' : <span>Shipment Date: <strong>{` ${formatDate(options.shipment_date)}`}</strong></span>}
                                            </p>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.currency) ? '' : <span>Preferred Currency: <strong>{` ${options.currency}`}</strong></span>}
                                            </p>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.signature_confirmation) ? '' : <span>Signature Confirmation <strong>Required</strong></span>}
                                            </p>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.insurance) ? '' : <>
                                                    <span>Insurance (Coverage Amount <strong>{options.insurance} {options.currency}</strong>)</span>
                                                </>}
                                            </p>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.declared_value) ? '' : <span>Declared Value: <strong>{` ${options.declared_value} ${options.currency}`}</strong></span>}
                                            </p>
                                            <p className="is-subtitle is-size-7 my-1 has-text-weight-semibold has-text-grey">
                                                {isNone(options.cash_on_delivery) ? '' : <>
                                                    <span>Amount To Collect <strong>{options.cash_on_delivery}{options.currency}</strong></span>
                                                </>}
                                            </p>
                                        </>)}
                                    </div>}
                                </div>

                            </div>

                        </>}

                        {!loading && isNone(shipment.id) && <div className="card my-6">

                            <div className="card-content has-text-centered">
                                <p>Uh Oh!</p>
                                <p>We couldn't find any shipment with that reference</p>
                            </div>

                        </div>}
                    </>}</CustomInvoicePrinterContext.Consumer>
                </>}</LabelPrinterContext.Consumer>
            </CustomInvoicePrinter>
        </LabelPrinter>
    )
};

export default ShipmentDetails;