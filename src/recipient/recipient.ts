import { TPaysackFetch } from '../fetch';
import { QueryParams, Response } from '../interface';
import {
  CreateRecipient,
  ListRecipientResponse,
  RecipientCreatedResponse,
  UpdateRecipient,
  ViewRecipientResponse,
} from './interface';

export class Recipient {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  /**
   * Create multiple transfer recipients in batches.
   *  A duplicate account number will lead to the retrieval of the existing record.
   * If you set `isBulk` to true, you must set the data as an array of recipients
   */
  async create(data: CreateRecipient | CreateRecipient[], isBulk?: boolean) {
    let body: unknown;
    let url = '/transferrecipient';
    body = data;
    if (isBulk) {
      url += '/bulk';
      body = { batch: data };
    }

    return await this.http<RecipientCreatedResponse>(url, {
      method: 'POST',
      body,
    });
  }

  async list(queryParams?: QueryParams) {
    return await this.http<ListRecipientResponse>('/transferrecipient', {
      query: { ...queryParams },
    });
  }

  async fetch(id: string) {
    return await this.http<ViewRecipientResponse>(`/transferrecipient/${id}`);
  }

  async update(id: string, data: UpdateRecipient) {
    return await this.http<RecipientCreatedResponse>(
      `/transferrecipient/${id}`,
      {
        method: 'PUT',
        body: data,
      },
    );
  }

  async delete(id: string) {
    return await this.http<Response>('/transferrecipient/:id', {
      method: 'DELETE',
      params: { id },
    });
  }
}
