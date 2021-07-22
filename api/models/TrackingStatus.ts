/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.7rc`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.7rc
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    TrackingEvent,
    TrackingEventFromJSON,
    TrackingEventFromJSONTyped,
    TrackingEventToJSON,
} from './';

/**
 * The tracking details retrieved
 * @export
 * @interface TrackingStatus
 */
export interface TrackingStatus {
    /**
     * A unique identifier
     * @type {string}
     * @memberof TrackingStatus
     */
    id?: string;
    /**
     * The tracking carrier
     * @type {string}
     * @memberof TrackingStatus
     */
    carrier_name: string;
    /**
     * The tracking carrier configured identifier
     * @type {string}
     * @memberof TrackingStatus
     */
    carrier_id: string;
    /**
     * The shipment tracking number
     * @type {string}
     * @memberof TrackingStatus
     */
    tracking_number: string;
    /**
     * The tracking details events
     * @type {Array<TrackingEvent>}
     * @memberof TrackingStatus
     */
    events?: Array<TrackingEvent> | null;
    /**
     * Specified whether the related shipment was delivered
     * @type {boolean}
     * @memberof TrackingStatus
     */
    delivered?: boolean;
    /**
     * Specified whether the object was created with a carrier in test mode
     * @type {boolean}
     * @memberof TrackingStatus
     */
    test_mode: boolean;
    /**
     * The current tracking status
     * @type {string}
     * @memberof TrackingStatus
     */
    status?: TrackingStatusStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum TrackingStatusStatusEnum {
    Created = 'created',
    Purchased = 'purchased',
    Cancelled = 'cancelled',
    Shipped = 'shipped',
    InTransit = 'in-transit',
    Delivered = 'delivered'
}

export function TrackingStatusFromJSON(json: any): TrackingStatus {
    return TrackingStatusFromJSONTyped(json, false);
}

export function TrackingStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackingStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'carrier_name': json['carrier_name'],
        'carrier_id': json['carrier_id'],
        'tracking_number': json['tracking_number'],
        'events': !exists(json, 'events') ? undefined : (json['events'] === null ? null : (json['events'] as Array<any>).map(TrackingEventFromJSON)),
        'delivered': !exists(json, 'delivered') ? undefined : json['delivered'],
        'test_mode': json['test_mode'],
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function TrackingStatusToJSON(value?: TrackingStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'carrier_name': value.carrier_name,
        'carrier_id': value.carrier_id,
        'tracking_number': value.tracking_number,
        'events': value.events === undefined ? undefined : (value.events === null ? null : (value.events as Array<any>).map(TrackingEventToJSON)),
        'delivered': value.delivered,
        'test_mode': value.test_mode,
        'status': value.status,
    };
}


