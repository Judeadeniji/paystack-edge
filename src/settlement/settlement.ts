import { QueryParams } from '../interface';
import {
  ListSettlementsResponse,
  ListSettlementTransactionsResponse,
  SettlementQueryParams,
} from './interface';
import { TPaysackFetch } from '../fetch';

export class Settlement {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async list(queryParams?: SettlementQueryParams) {
    return await this.http<ListSettlementsResponse>('/settlement', {
      query: { ...queryParams },
    });
  }

  async transactions(id: string, queryParams: QueryParams) {
    return await this.http<ListSettlementTransactionsResponse>(
      '/settlement/:id/transactions',
      {
        params: { id },
        query: { ...queryParams },
      },
    );
  }
}
