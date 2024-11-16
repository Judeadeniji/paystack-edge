import { QueryParams, Response } from '../interface';
import {
  FetchBulkBatchChargeResponse,
  FetchChargesInBatchResponse,
  InitiateBulkCharge,
  InitiateBulkChargeResponse,
  ListBulkChargeBatchesResponse,
  QueryBatchChargesParams,
} from './interface';
import { TPaysackFetch } from '../fetch';

export class BulkCharge {
  http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async initiate(data: InitiateBulkCharge[]) {
    return await this.http<InitiateBulkChargeResponse>('/bulkcharge', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: QueryParams) {
    return await this.http<ListBulkChargeBatchesResponse>('/bulkcharge', {
      query: { ...queryParams },
    });
  }

  async fetchBulkCharge(id: string) {
    return await this.http<FetchBulkBatchChargeResponse>('/bulkcharge/:id', {
      params: { id },
    });
  }

  async fetchBatchChrges(id: string, queryParams?: QueryBatchChargesParams) {
    return await this.http<FetchChargesInBatchResponse>(
      '/bulkcharge/:id/charges',
      {
        params: { id },
        query: { ...queryParams },
      },
    );
  }

  async pause(batchCode: string) {
    return await this.http<Response>('/bulkcharge/pause/:batchCode', {
      params: { batchCode },
    });
  }

  async resume(batchCode: string) {
    return await this.http<Response>('/bulkcharge/resume/:batchCode', {
      params: { batchCode },
    });
  }
}
