/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.4`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.4
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AddressData,
    AddressDataFromJSON,
    AddressDataFromJSONTyped,
    AddressDataToJSON,
} from './';

/**
 * 
 * @export
 * @interface PickupUpdateData
 */
export interface PickupUpdateData {
    /**
     * 
     * The expected pickup date
     * 
     * Date Format: YYYY-MM-DD
     * @type {string}
     * @memberof PickupUpdateData
     */
    pickup_date?: string;
    /**
     * 
     * @type {AddressData}
     * @memberof PickupUpdateData
     */
    address?: AddressData;
    /**
     * The ready time for pickup.
     * @type {string}
     * @memberof PickupUpdateData
     */
    ready_time?: string | null;
    /**
     * The closing or late time of the pickup
     * @type {string}
     * @memberof PickupUpdateData
     */
    closing_time?: string | null;
    /**
     * 
     * The pickup instruction.
     * 
     * eg: Handle with care.
     * @type {string}
     * @memberof PickupUpdateData
     */
    instruction?: string | null;
    /**
     * 
     * The package(s) location.
     * 
     * eg: Behind the entrance door.
     * @type {string}
     * @memberof PickupUpdateData
     */
    package_location?: string | null;
    /**
     * Advanced carrier specific pickup options
     * @type {object}
     * @memberof PickupUpdateData
     */
    options?: object | null;
    /**
     * The list of shipments to be picked up
     * @type {Array<string>}
     * @memberof PickupUpdateData
     */
    tracking_numbers?: Array<string>;
    /**
     * pickup identification number
     * @type {string}
     * @memberof PickupUpdateData
     */
    confirmation_number: string;
}

export function PickupUpdateDataFromJSON(json: any): PickupUpdateData {
    return PickupUpdateDataFromJSONTyped(json, false);
}

export function PickupUpdateDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): PickupUpdateData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pickup_date': !exists(json, 'pickup_date') ? undefined : json['pickup_date'],
        'address': !exists(json, 'address') ? undefined : AddressDataFromJSON(json['address']),
        'ready_time': !exists(json, 'ready_time') ? undefined : json['ready_time'],
        'closing_time': !exists(json, 'closing_time') ? undefined : json['closing_time'],
        'instruction': !exists(json, 'instruction') ? undefined : json['instruction'],
        'package_location': !exists(json, 'package_location') ? undefined : json['package_location'],
        'options': !exists(json, 'options') ? undefined : json['options'],
        'tracking_numbers': !exists(json, 'tracking_numbers') ? undefined : json['tracking_numbers'],
        'confirmation_number': json['confirmation_number'],
    };
}

export function PickupUpdateDataToJSON(value?: PickupUpdateData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'pickup_date': value.pickup_date,
        'address': AddressDataToJSON(value.address),
        'ready_time': value.ready_time,
        'closing_time': value.closing_time,
        'instruction': value.instruction,
        'package_location': value.package_location,
        'options': value.options,
        'tracking_numbers': value.tracking_numbers,
        'confirmation_number': value.confirmation_number,
    };
}


