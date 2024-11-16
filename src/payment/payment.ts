import { TPaysackFetch } from '../fetch';
import { QueryParams } from '../interface';
import {
  CreatePage,
  ListPaymentPagesResponse,
  PaymentPageCreatedFetchedUpdatedResponse,
  UpdatePage,
} from './interface';
import { Response } from '../interface';

export class PaymentPage {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreatePage) {
    return await this.http<Response>('/page', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: QueryParams) {
    return await this.http<ListPaymentPagesResponse>('/page', {
      query: { ...queryParams },
    });
  }

  async fetch(id: string) {
    return await this.http<PaymentPageCreatedFetchedUpdatedResponse>(
      '/page/:id',
      {
        params: { id },
      },
    );
  }

  async update(id: string, data: UpdatePage) {
    return await this.http<PaymentPageCreatedFetchedUpdatedResponse>(
      '/page/:id',
      {
        method: 'PUT',
        params: { id },
        body: data,
      },
    );
  }

  async slugAvailable(slug: string) {
    return await this.http<Response>('/page/slug/:slug', {
      params: { slug },
    });
  }

  async addProduct(id: number, products: number[]) {
    return await this.http<Response>('/page/:id/product', {
      params: { id: id.toString() },
      body: { products },
    });
  }
}
