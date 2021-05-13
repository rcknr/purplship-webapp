/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.4.4`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade. 
 *
 * The version of the OpenAPI document: 2021.4.4
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AccessToken
 */
export interface AccessToken {
    /**
     * 
     * @type {string}
     * @memberof AccessToken
     */
    access: string;
}

export function AccessTokenFromJSON(json: any): AccessToken {
    return AccessTokenFromJSONTyped(json, false);
}

export function AccessTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccessToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'access': json['access'],
    };
}

export function AccessTokenToJSON(value?: AccessToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'access': value.access,
    };
}


