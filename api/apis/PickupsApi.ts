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


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OperationConfirmation,
    OperationConfirmationFromJSON,
    OperationConfirmationToJSON,
    Pickup,
    PickupFromJSON,
    PickupToJSON,
    PickupCancelData,
    PickupCancelDataFromJSON,
    PickupCancelDataToJSON,
    PickupData,
    PickupDataFromJSON,
    PickupDataToJSON,
    PickupList,
    PickupListFromJSON,
    PickupListToJSON,
    PickupUpdateData,
    PickupUpdateDataFromJSON,
    PickupUpdateDataToJSON,
} from '../models';

export interface CancelRequest {
    id: string;
    data: PickupCancelData;
}

export interface ListRequest {
    testMode?: boolean;
    limit?: number;
    offset?: number;
}

export interface RetrieveRequest {
    id: string;
}

export interface ScheduleRequest {
    carrierName: string;
    data: PickupData;
    test?: boolean | null;
}

export interface UpdateRequest {
    id: string;
    data: PickupUpdateData;
}

/**
 * 
 */
export class PickupsApi extends runtime.BaseAPI {

    /**
     * Cancel a pickup of one or more shipments.
     * Cancel a pickup
     */
    async cancelRaw(requestParameters: CancelRequest): Promise<runtime.ApiResponse<OperationConfirmation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling cancel.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling cancel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/pickups/{id}/cancel`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupCancelDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationConfirmationFromJSON(jsonValue));
    }

    /**
     * Cancel a pickup of one or more shipments.
     * Cancel a pickup
     */
    async cancel(requestParameters: CancelRequest): Promise<OperationConfirmation> {
        const response = await this.cancelRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all scheduled pickups.
     * List shipment pickups
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<PickupList>> {
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
            path: `/v1/pickups`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupListFromJSON(jsonValue));
    }

    /**
     * Retrieve all scheduled pickups.
     * List shipment pickups
     */
    async list(requestParameters: ListRequest): Promise<PickupList> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a scheduled pickup.
     * Retrieve a pickup
     */
    async retrieveRaw(requestParameters: RetrieveRequest): Promise<runtime.ApiResponse<Pickup>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/pickups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupFromJSON(jsonValue));
    }

    /**
     * Retrieve a scheduled pickup.
     * Retrieve a pickup
     */
    async retrieve(requestParameters: RetrieveRequest): Promise<Pickup> {
        const response = await this.retrieveRaw(requestParameters);
        return await response.value();
    }

    /**
     * Schedule a pickup for one or many shipments with labels already purchased.
     * Schedule a pickup
     */
    async scheduleRaw(requestParameters: ScheduleRequest): Promise<runtime.ApiResponse<Pickup>> {
        if (requestParameters.carrierName === null || requestParameters.carrierName === undefined) {
            throw new runtime.RequiredError('carrierName','Required parameter requestParameters.carrierName was null or undefined when calling schedule.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling schedule.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/pickups/{carrier_name}/schedule`.replace(`{${"carrier_name"}}`, encodeURIComponent(String(requestParameters.carrierName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PickupDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PickupFromJSON(jsonValue));
    }

    /**
     * Schedule a pickup for one or many shipments with labels already purchased.
     * Schedule a pickup
     */
    async schedule(requestParameters: ScheduleRequest): Promise<Pickup> {
        const response = await this.scheduleRaw(requestParameters);
        return await response.value();
    }

    /**
     * Modify a pickup for one or many shipments with labels already purchased.
     * Update a pickup
     */
    async updateRaw(requestParameters: UpdateRequest): Promise<runtime.ApiResponse<OperationConfirmation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling update.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/pickups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PickupUpdateDataToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationConfirmationFromJSON(jsonValue));
    }

    /**
     * Modify a pickup for one or many shipments with labels already purchased.
     * Update a pickup
     */
    async update(requestParameters: UpdateRequest): Promise<OperationConfirmation> {
        const response = await this.updateRaw(requestParameters);
        return await response.value();
    }

}
