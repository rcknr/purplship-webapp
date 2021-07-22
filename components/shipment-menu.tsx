import React, { useState, useRef, useContext } from 'react';
import { Shipment, ShipmentStatusEnum } from '@/api/index';
import LabelPrinter from '@/components/label/label-printer';
import { useNavigate } from '@reach/router';
import { NotificationType } from '@/library/types';
import ShipmentMutation from '@/context/shipment-mutation';
import { Notify } from '@/components/notifier';
import { Shipments } from '@/context/shipments-query';
import { isNone } from '@/library/helper';


interface ShipmentMenuComponent extends React.InputHTMLAttributes<HTMLDivElement> {
    shipment: Shipment;
}


const ShipmentMenu: React.FC<ShipmentMenuComponent> = ShipmentMutation<ShipmentMenuComponent>(({ shipment, voidLabel, className, ...props }) => {
    const navigate = useNavigate();
    const { notify } = useContext(Notify);
    const shipments = useContext(Shipments)
    const btn = useRef<HTMLButtonElement>(null);
    const [isActive, setIsActive] = useState(false);

    const handleOnClick = (e: React.MouseEvent) => {
        if (!isActive) {
            setIsActive(true);
            document.addEventListener('click', onBodyClick);
        }
        e.preventDefault();
        e.stopPropagation();
    };
    const onBodyClick = (e: MouseEvent) => {
        if (e.target !== btn.current) {
            setIsActive(false);
            document.removeEventListener('click', onBodyClick);
        }
    };
    const createLabel = (_: React.MouseEvent) => {
        navigate('buy_label/' + shipment.id);
    };
    const displayDetails = (_: React.MouseEvent) => {
        navigate('shipments/' + shipment.id);
    };
    const cancelShipment = (shipment: Shipment) => async (e: React.MouseEvent) => {
        try {
            await voidLabel(shipment);
            notify({ type: NotificationType.success, message: 'Shipment successfully cancelled!' });
            shipments.refetch();
        } catch (err) {
            notify({ type: NotificationType.error, message: err });
        }
    };

    return (
        <div className={`buttons has-addons ${className}`} {...props}>

            {!isNone(shipment.label) && <LabelPrinter shipment={shipment}  className="is-small" style={{ width: '70%' }} />}
            {isNone(shipment.label) && shipment.status === ShipmentStatusEnum.Created && <>
                <a className="button is-small" onClick={createLabel} style={{ width: '70%' }}>
                    <span>Buy Label</span>
                </a>
            </>}
            {isNone(shipment.label) && shipment.status === ShipmentStatusEnum.Cancelled && <>
                <a className="button is-small" onClick={displayDetails} style={{ width: '70%' }}>
                    <span>View Shipment</span>
                </a>
            </>}

            <div className={`dropdown is-right ${isActive ? 'is-active' : ''}`} key={`menu-${shipment.id}`}>
                <div className="dropdown-trigger">
                    <button
                        id={shipment.id}
                        className="button is-small"
                        aria-haspopup="true"
                        aria-controls={`shipment-menu-${shipment.id}`}
                        onClick={handleOnClick}
                        ref={btn}>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>

                <div className="dropdown-menu" id={`shipment-menu-${shipment.id}`} role="menu">
                    <div className="dropdown-content">
                        <a className="dropdown-item" onClick={displayDetails}>View Shipment</a>
                        {shipment.status !== ShipmentStatusEnum.Cancelled && <a href="#" className="dropdown-item" onClick={cancelShipment(shipment)}>Cancel Shipment</a>}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ShipmentMenu;
