import {
  FetchRefundResponse,
  CreateRefund,
  ListRefundQueryParams,
  ListRefundsResponse,
  RefundCreatedResponse,
} from './interface';
import { TPaysackFetch } from '../fetch';

export class Refund {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  /**
   * #### Create Refund
   * Initiate a refund on your integration
   */
  async create(data: CreateRefund) {
    return await this.http<RefundCreatedResponse>('/refund', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * #### List Refunds
   * List refunds available on your integration
   */
  async list(queryParams?: ListRefundQueryParams) {
    return await this.http<ListRefundsResponse>('/refund', {
      query: { ...queryParams },
    });
  }

  /**
   * #### Fetch Refund
   * Get details of a refund on your integration
   */
  async fetch(reference: string) {
    return await this.http<FetchRefundResponse>('/refund/:reference', {
      params: { reference },
    });
  }
}
