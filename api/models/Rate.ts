/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.6-rc1`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.6-rc1
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Charge,
    ChargeFromJSON,
    ChargeFromJSONTyped,
    ChargeToJSON,
} from './';

/**
 * The list of returned rates
 * @export
 * @interface Rate
 */
export interface Rate {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Rate
     */
    id?: string;
    /**
     * The rate's carrier
     * @type {string}
     * @memberof Rate
     */
    carrier_name: string;
    /**
     * The targeted carrier's name (unique identifier)
     * @type {string}
     * @memberof Rate
     */
    carrier_id: string;
    /**
     * The rate monetary values currency code
     * @type {string}
     * @memberof Rate
     */
    currency: string;
    /**
     * The carrier's rate (quote) service
     * @type {string}
     * @memberof Rate
     */
    service?: string | null;
    /**
     * The monetary amount of the discount on the rate
     * @type {number}
     * @memberof Rate
     */
    discount?: number | null;
    /**
     * 
     * The rate's monetary amount of the base charge.<br/>
     * This is the net amount of the rate before additional charges
     * @type {number}
     * @memberof Rate
     */
    base_charge?: number;
    /**
     * 
     * The rate's monetary amount of the total charge.<br/>
     * This is the gross amount of the rate after adding the additional charges
     * @type {number}
     * @memberof Rate
     */
    total_charge?: number;
    /**
     * The monetary amount of the duties and taxes if applied
     * @type {number}
     * @memberof Rate
     */
    duties_and_taxes?: number | null;
    /**
     * The estimated delivery transit days
     * @type {number}
     * @memberof Rate
     */
    transit_days?: number | null;
    /**
     * list of the rate's additional charges
     * @type {Array<Charge>}
     * @memberof Rate
     */
    extra_charges?: Array<Charge> | null;
    /**
     * provider specific metadata
     * @type {object}
     * @memberof Rate
     */
    meta?: object | null;
    /**
     * The system carrier configuration id
     * @type {string}
     * @memberof Rate
     */
    carrier_ref?: string | null;
    /**
     * Specified whether it was created with a carrier in test mode
     * @type {boolean}
     * @memberof Rate
     */
    test_mode: boolean;
}

export function RateFromJSON(json: any): Rate {
    return RateFromJSONTyped(json, false);
}

export function RateFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'carrier_name': json['carrier_name'],
        'carrier_id': json['carrier_id'],
        'currency': json['currency'],
        'service': !exists(json, 'service') ? undefined : json['service'],
        'discount': !exists(json, 'discount') ? undefined : json['discount'],
        'base_charge': !exists(json, 'base_charge') ? undefined : json['base_charge'],
        'total_charge': !exists(json, 'total_charge') ? undefined : json['total_charge'],
        'duties_and_taxes': !exists(json, 'duties_and_taxes') ? undefined : json['duties_and_taxes'],
        'transit_days': !exists(json, 'transit_days') ? undefined : json['transit_days'],
        'extra_charges': !exists(json, 'extra_charges') ? undefined : (json['extra_charges'] === null ? null : (json['extra_charges'] as Array<any>).map(ChargeFromJSON)),
        'meta': !exists(json, 'meta') ? undefined : json['meta'],
        'carrier_ref': !exists(json, 'carrier_ref') ? undefined : json['carrier_ref'],
        'test_mode': json['test_mode'],
    };
}

export function RateToJSON(value?: Rate | null): any {
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
        'currency': value.currency,
        'service': value.service,
        'discount': value.discount,
        'base_charge': value.base_charge,
        'total_charge': value.total_charge,
        'duties_and_taxes': value.duties_and_taxes,
        'transit_days': value.transit_days,
        'extra_charges': value.extra_charges === undefined ? undefined : (value.extra_charges === null ? null : (value.extra_charges as Array<any>).map(ChargeToJSON)),
        'meta': value.meta,
        'carrier_ref': value.carrier_ref,
        'test_mode': value.test_mode,
    };
}


