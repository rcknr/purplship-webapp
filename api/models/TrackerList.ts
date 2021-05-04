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
    TrackingStatus,
    TrackingStatusFromJSON,
    TrackingStatusFromJSONTyped,
    TrackingStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface TrackerList
 */
export interface TrackerList {
    /**
     * 
     * @type {string}
     * @memberof TrackerList
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof TrackerList
     */
    previous?: string;
    /**
     * 
     * @type {Array<TrackingStatus>}
     * @memberof TrackerList
     */
    results: Array<TrackingStatus>;
}

export function TrackerListFromJSON(json: any): TrackerList {
    return TrackerListFromJSONTyped(json, false);
}

export function TrackerListFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackerList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(TrackingStatusFromJSON)),
    };
}

export function TrackerListToJSON(value?: TrackerList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'next': value.next,
        'previous': value.previous,
        'results': ((value.results as Array<any>).map(TrackingStatusToJSON)),
    };
}


