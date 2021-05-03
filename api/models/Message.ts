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
/**
 * The list of error messages
 * @export
 * @interface Message
 */
export interface Message {
    /**
     * The targeted carrier
     * @type {string}
     * @memberof Message
     */
    carrier_name?: string;
    /**
     * The targeted carrier name (unique identifier)
     * @type {string}
     * @memberof Message
     */
    carrier_id?: string;
    /**
     * The error or warning message
     * @type {string}
     * @memberof Message
     */
    message?: string;
    /**
     * The message code
     * @type {string}
     * @memberof Message
     */
    code?: string;
    /**
     * any additional details
     * @type {{ [key: string]: string; }}
     * @memberof Message
     */
    details?: { [key: string]: string; };
}

export function MessageFromJSON(json: any): Message {
    return MessageFromJSONTyped(json, false);
}

export function MessageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Message {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'carrier_name': !exists(json, 'carrier_name') ? undefined : json['carrier_name'],
        'carrier_id': !exists(json, 'carrier_id') ? undefined : json['carrier_id'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'details': !exists(json, 'details') ? undefined : json['details'],
    };
}

export function MessageToJSON(value?: Message | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'carrier_name': value.carrier_name,
        'carrier_id': value.carrier_id,
        'message': value.message,
        'code': value.code,
        'details': value.details,
    };
}


