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
/**
 * The payment details
 * @export
 * @interface Payment
 */
export interface Payment {
    /**
     * The payor type
     * @type {string}
     * @memberof Payment
     */
    paid_by?: PaymentPaidByEnum;
    /**
     * The payment amount currency
     * @type {string}
     * @memberof Payment
     */
    currency?: PaymentCurrencyEnum;
    /**
     * The payor account number
     * @type {string}
     * @memberof Payment
     */
    account_number?: string | null;
}

/**
* @export
* @enum {string}
*/
export enum PaymentPaidByEnum {
    Sender = 'sender',
    Recipient = 'recipient',
    ThirdParty = 'third_party'
}/**
* @export
* @enum {string}
*/
export enum PaymentCurrencyEnum {
    Eur = 'EUR',
    Aed = 'AED',
    Usd = 'USD',
    Xcd = 'XCD',
    Amd = 'AMD',
    Ang = 'ANG',
    Aoa = 'AOA',
    Ars = 'ARS',
    Aud = 'AUD',
    Awg = 'AWG',
    Azn = 'AZN',
    Bam = 'BAM',
    Bbd = 'BBD',
    Bdt = 'BDT',
    Xof = 'XOF',
    Bgn = 'BGN',
    Bhd = 'BHD',
    Bif = 'BIF',
    Bmd = 'BMD',
    Bnd = 'BND',
    Bob = 'BOB',
    Brl = 'BRL',
    Bsd = 'BSD',
    Btn = 'BTN',
    Bwp = 'BWP',
    Byn = 'BYN',
    Bzd = 'BZD',
    Cad = 'CAD',
    Cdf = 'CDF',
    Xaf = 'XAF',
    Chf = 'CHF',
    Nzd = 'NZD',
    Clp = 'CLP',
    Cny = 'CNY',
    Cop = 'COP',
    Crc = 'CRC',
    Cuc = 'CUC',
    Cve = 'CVE',
    Czk = 'CZK',
    Djf = 'DJF',
    Dkk = 'DKK',
    Dop = 'DOP',
    Dzd = 'DZD',
    Egp = 'EGP',
    Ern = 'ERN',
    Etb = 'ETB',
    Fjd = 'FJD',
    Gbp = 'GBP',
    Gel = 'GEL',
    Ghs = 'GHS',
    Gmd = 'GMD',
    Gnf = 'GNF',
    Gtq = 'GTQ',
    Gyd = 'GYD',
    Hkd = 'HKD',
    Hnl = 'HNL',
    Hrk = 'HRK',
    Htg = 'HTG',
    Huf = 'HUF',
    Idr = 'IDR',
    Ils = 'ILS',
    Inr = 'INR',
    Irr = 'IRR',
    Isk = 'ISK',
    Jmd = 'JMD',
    Jod = 'JOD',
    Jpy = 'JPY',
    Kes = 'KES',
    Kgs = 'KGS',
    Khr = 'KHR',
    Kmf = 'KMF',
    Kpw = 'KPW',
    Krw = 'KRW',
    Kwd = 'KWD',
    Kyd = 'KYD',
    Kzt = 'KZT',
    Lak = 'LAK',
    Lkr = 'LKR',
    Lrd = 'LRD',
    Lsl = 'LSL',
    Lyd = 'LYD',
    Mad = 'MAD',
    Mdl = 'MDL',
    Mga = 'MGA',
    Mkd = 'MKD',
    Mmk = 'MMK',
    Mnt = 'MNT',
    Mop = 'MOP',
    Mro = 'MRO',
    Mur = 'MUR',
    Mvr = 'MVR',
    Mwk = 'MWK',
    Mxn = 'MXN',
    Myr = 'MYR',
    Mzn = 'MZN',
    Nad = 'NAD',
    Xpf = 'XPF',
    Ngn = 'NGN',
    Nio = 'NIO',
    Nok = 'NOK',
    Npr = 'NPR',
    Omr = 'OMR',
    Pen = 'PEN',
    Pgk = 'PGK',
    Php = 'PHP',
    Pkr = 'PKR',
    Pln = 'PLN',
    Pyg = 'PYG',
    Qar = 'QAR',
    Rsd = 'RSD',
    Rub = 'RUB',
    Rwf = 'RWF',
    Sar = 'SAR',
    Sbd = 'SBD',
    Scr = 'SCR',
    Sdg = 'SDG',
    Sek = 'SEK',
    Sgd = 'SGD',
    Shp = 'SHP',
    Sll = 'SLL',
    Sos = 'SOS',
    Srd = 'SRD',
    Ssp = 'SSP',
    Std = 'STD',
    Syp = 'SYP',
    Szl = 'SZL',
    Thb = 'THB',
    Tjs = 'TJS',
    Tnd = 'TND',
    Top = 'TOP',
    Try = 'TRY',
    Ttd = 'TTD',
    Twd = 'TWD',
    Tzs = 'TZS',
    Uah = 'UAH',
    Uyu = 'UYU',
    Uzs = 'UZS',
    Vef = 'VEF',
    Vnd = 'VND',
    Vuv = 'VUV',
    Wst = 'WST',
    Yer = 'YER',
    Zar = 'ZAR'
}

export function PaymentFromJSON(json: any): Payment {
    return PaymentFromJSONTyped(json, false);
}

export function PaymentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Payment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paid_by': !exists(json, 'paid_by') ? undefined : json['paid_by'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'account_number': !exists(json, 'account_number') ? undefined : json['account_number'],
    };
}

export function PaymentToJSON(value?: Payment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paid_by': value.paid_by,
        'currency': value.currency,
        'account_number': value.account_number,
    };
}


