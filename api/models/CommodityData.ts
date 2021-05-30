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
/**
 * 
 * @export
 * @interface CommodityData
 */
export interface CommodityData {
    /**
     * The commodity's weight
     * @type {number}
     * @memberof CommodityData
     */
    weight: number;
    /**
     * The commodity's weight unit
     * @type {string}
     * @memberof CommodityData
     */
    weight_unit: CommodityDataWeightUnitEnum;
    /**
     * A description of the commodity
     * @type {string}
     * @memberof CommodityData
     */
    description?: string | null;
    /**
     * The commodity's quantity (number or item)
     * @type {number}
     * @memberof CommodityData
     */
    quantity?: number | null;
    /**
     * The commodity's sku number
     * @type {string}
     * @memberof CommodityData
     */
    sku?: string | null;
    /**
     * The monetary value of the commodity
     * @type {number}
     * @memberof CommodityData
     */
    value_amount?: number | null;
    /**
     * The currency of the commodity value amount
     * @type {string}
     * @memberof CommodityData
     */
    value_currency?: string | null;
    /**
     * The origin or manufacture country
     * @type {string}
     * @memberof CommodityData
     */
    origin_country?: string | null;
}

/**
* @export
* @enum {string}
*/
export enum CommodityDataWeightUnitEnum {
    Kg = 'KG',
    Lb = 'LB'
}

export function CommodityDataFromJSON(json: any): CommodityData {
    return CommodityDataFromJSONTyped(json, false);
}

export function CommodityDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommodityData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'weight': json['weight'],
        'weight_unit': json['weight_unit'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
        'sku': !exists(json, 'sku') ? undefined : json['sku'],
        'value_amount': !exists(json, 'value_amount') ? undefined : json['value_amount'],
        'value_currency': !exists(json, 'value_currency') ? undefined : json['value_currency'],
        'origin_country': !exists(json, 'origin_country') ? undefined : json['origin_country'],
    };
}

export function CommodityDataToJSON(value?: CommodityData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'weight': value.weight,
        'weight_unit': value.weight_unit,
        'description': value.description,
        'quantity': value.quantity,
        'sku': value.sku,
        'value_amount': value.value_amount,
        'value_currency': value.value_currency,
        'origin_country': value.origin_country,
    };
}


