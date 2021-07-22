import { ShipmentStatusEnum } from '@/api/index';
import React from 'react';

interface StatusBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> {
    status?: string | ShipmentStatusEnum;
}

const StatusBadge: React.FC<StatusBadgeComponent> = ({ status, className, ...props }) => {
    const color = {
        "created": "is-info is-light",
        "purchased": "is-info is-ligh",
        "cancelled": "is-light",
        "shipped": "is-link is-light",
        "transit": "is-link is-light",
        "delivered": "is-success is-light",
    }[status || ""] || "is-light";
   
    return (
        <span className={`tag is-size-7 is-capitalized ${color} ${className}`} {...props}>{status}</span>
    )
};

export default StatusBadge;
