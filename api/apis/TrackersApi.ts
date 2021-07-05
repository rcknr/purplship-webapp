/* tslint:disable */
/* eslint-disable */
/**
 * Purplship API
 *  ## API Reference  Purplship is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Purplship API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded  request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Purplship API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released.  The current version is `2021.6.2`.   Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses,  list shipments, and list trackers. These list API methods share a common structure, taking at least these  two parameters: limit, and offset.  Purplship utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order.  The offset parameter returns objects listed after an index.  The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"next\": \"/v1/shipments?limit=25&offset=25\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [     ] } ```  ## Environments  The Purplship API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates,  buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2021.6.2
 * Contact: hello@purplship.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    Operation,
    OperationFromJSON,
    OperationToJSON,
    TrackerList,
    TrackerListFromJSON,
    TrackerListToJSON,
    TrackingStatus,
    TrackingStatusFromJSON,
    TrackingStatusToJSON,
} from '../models';

export interface CreateRequest {
    carrierName: string;
    trackingNumber: string;
    test?: boolean | null;
}

export interface ListRequest {
    testMode?: boolean;
    limit?: number;
    offset?: number;
}

export interface RemoveRequest {
    idOrTrackingNumber: string;
}

export interface RetrievesRequest {
    idOrTrackingNumber: string;
}

/**
 * 
 */
export class TrackersApi extends runtime.BaseAPI {

    /**
     * This API creates or retrieves (if existent) a tracking status object containing the details and events of a shipping in progress.
     * Create a shipment tracker
     */
    async createRaw(requestParameters: CreateRequest): Promise<runtime.ApiResponse<TrackingStatus>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling create.');
        }

        if (requestParameters.trackingNumber === null || requestParameters.trackingNumber === undefined) {
            throw new runtime.RequiredError('trackingNumber','Required parameter requestParameters.trackingNumber was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers/{carrier_name}/{tracking_number}`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))).replace(`{${"tracking_number"}}`, encodeURIComponent(String(requestParameters.trackingNumber))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackingStatusFromJSON(jsonValue));
    }

    /**
     * This API creates or retrieves (if existent) a tracking status object containing the details and events of a shipping in progress.
     * Create a shipment tracker
     */
    async create(requestParameters: CreateRequest): Promise<TrackingStatus> {
        const response = await this.createRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all shipment trackers.
     * List all shipment trackers
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<TrackerList>> {
        const queryParameters: any = {};

        if (requestParameters.testMode !== undefined) {
            queryParameters['test_mode'] = requestParameters.testMode;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackerListFromJSON(jsonValue));
    }

    /**
     * Retrieve all shipment trackers.
     * List all shipment trackers
     */
    async list(requestParameters: ListRequest): Promise<TrackerList> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     * Discard a shipment tracker.
     * Discard a shipment tracker
     */
    async removeRaw(requestParameters: RemoveRequest): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.idOrTrackingNumber === null || requestParameters.idOrTrackingNumber === undefined) {
            throw new runtime.RequiredError('idOrTrackingNumber','Required parameter requestParameters.idOrTrackingNumber was null or undefined when calling remove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers/{id_or_tracking_number}`.replace(`{${"id_or_tracking_number"}}`, encodeURIComponent(String(requestParameters.idOrTrackingNumber))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Discard a shipment tracker.
     * Discard a shipment tracker
     */
    async remove(requestParameters: RemoveRequest): Promise<Operation> {
        const response = await this.removeRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a shipment tracker
     * Retrieves a shipment tracker
     */
    async retrievesRaw(requestParameters: RetrievesRequest): Promise<runtime.ApiResponse<TrackingStatus>> {
        if (requestParameters.idOrTrackingNumber === null || requestParameters.idOrTrackingNumber === undefined) {
            throw new runtime.RequiredError('idOrTrackingNumber','Required parameter requestParameters.idOrTrackingNumber was null or undefined when calling retrieves.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/trackers/{id_or_tracking_number}`.replace(`{${"id_or_tracking_number"}}`, encodeURIComponent(String(requestParameters.idOrTrackingNumber))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TrackingStatusFromJSON(jsonValue));
    }

    /**
     * Retrieve a shipment tracker
     * Retrieves a shipment tracker
     */
    async retrieves(requestParameters: RetrievesRequest): Promise<TrackingStatus> {
        const response = await this.retrievesRaw(requestParameters);
        return await response.value();
    }

}
