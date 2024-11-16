import { TPaysackFetch } from '../fetch';
import {
  CreateInvoice,
  InvoiceCreatedResponse,
  InvoiceQueryParams,
  InvoiceTotalResponse,
  ListInvoicesResponse,
  UpdateInvoice,
  ViewInvoiceResponse,
} from './interface';
import { Response } from '../interface';

export class Invoice {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreateInvoice) {
    return await this.http<InvoiceCreatedResponse>('/paymentrequest', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: InvoiceQueryParams) {
    return await this.http<ListInvoicesResponse>('/paymentrequest', {
      query: { ...queryParams },
    });
  }

  async view(id: string) {
    return await this.http<ViewInvoiceResponse>('/paymentrequest/:id', {
      params: { id },
    });
  }

  async verify(code: string) {
    return await this.http<ViewInvoiceResponse>(
      '/paymentrequest/verify/:code',
      {
        params: { code },
      },
    );
  }

  async sendNotification(code: string) {
    return await this.http<Response>(
      '/paymentrequest/send-notification/:code',
      {
        params: { code },
      },
    );
  }

  async total() {
    return await this.http<InvoiceTotalResponse>('/paymentrequest/total');
  }

  async finalize(code: string) {
    return await this.http<Response>('/paymentrequest/finalize/:code', {
      params: { code },
    });
  }
  async update(id: string, data: UpdateInvoice) {
    return await this.http<Response>('/paymentrequest/:id', {
      method: 'PUT',
      params: { id },
      body: data,
    });
  }

  async archive(code: string) {
    return await this.http<Response>('/paymentrequest/archive/:code', {
      params: { code },
    });
  }
}
