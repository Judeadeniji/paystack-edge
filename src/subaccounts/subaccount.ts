import { TPaysackFetch } from '../fetch';
import { QueryParams } from '../interface';
import {
  CreateUpdateSubAccount,
  FetchSubAccountResponse,
  ListSubAccountsResponse,
  SubAccountCreatedUpdateResponse,
} from './interface';

export class SubAccount {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreateUpdateSubAccount) {
    return await this.http<SubAccountCreatedUpdateResponse>('/subaccount', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: QueryParams) {
    return await this.http<ListSubAccountsResponse>('/subaccount', {
      query: { ...queryParams },
    });
  }

  async fetch(id: string) {
    return await this.http<FetchSubAccountResponse>('/subaccount/:id', {
      params: { id },
    });
  }

  async update(id: string, data: CreateUpdateSubAccount) {
    return await this.http<SubAccountCreatedUpdateResponse>('/subaccount/:id', {
      method: 'PUT',
      params: { id },
      body: data,
    });
  }
}
