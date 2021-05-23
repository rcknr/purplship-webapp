/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.5-rc2`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.5-rc2
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Message,
    MessageFromJSON,
    MessageFromJSONTyped,
    MessageToJSON,
    Rate,
    RateFromJSON,
    RateFromJSONTyped,
    RateToJSON,
} from './';

/**
 * 
 * @export
 * @interface RateResponse
 */
export interface RateResponse {
    /**
     * The list of note or warning messages
     * @type {Array<Message>}
     * @memberof RateResponse
     */
    messages?: Array<Message>;
    /**
     * The list of returned rates
     * @type {Array<Rate>}
     * @memberof RateResponse
     */
    rates: Array<Rate>;
}

export function RateResponseFromJSON(json: any): RateResponse {
    return RateResponseFromJSONTyped(json, false);
}

export function RateResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RateResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'messages': !exists(json, 'messages') ? undefined : ((json['messages'] as Array<any>).map(MessageFromJSON)),
        'rates': ((json['rates'] as Array<any>).map(RateFromJSON)),
    };
}

export function RateResponseToJSON(value?: RateResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'messages': value.messages === undefined ? undefined : ((value.messages as Array<any>).map(MessageToJSON)),
        'rates': ((value.rates as Array<any>).map(RateToJSON)),
    };
}


