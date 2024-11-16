import {
  CheckAuthorizationResponse,
  ExportTransaction,
  ListTransactions,
  PartialDebitResponse,
  Timeline,
  GetTransactionResponse,
  ChargeAuthorization,
  CheckAuthorization,
  InitializeTransaction,
  ListTransactionQueryParams,
  PartialDebit,
  TransactionInitialized,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * # Transactions
 * The transaction API allows you to create and manage
 * payments on your integration
 */
export class Transaction {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }
  /**
   * Initialize a transaction
   * @param {InitializeTransaction} data **Body Param**
   */
  async initialize(data: InitializeTransaction) {
    return await this.http<TransactionInitialized>('/transaction/initialize', {
      method: 'POST',
      body: data,
    });
  }
  async verify(reference: string) {
    return await this.http<GetTransactionResponse>(
      '/transaction/verify/:reference',
      {
        params: { reference },
      },
    );
  }
  async list(queryParams?: ListTransactionQueryParams) {
    return await this.http<ListTransactions>('/transaction', {
      query: { ...queryParams },
    });
  }

  async fetch(id: string) {
    return await this.http<GetTransactionResponse>('/transaction/:id', {
      params: { id },
    });
  }

  async chargeAuthorization(data: ChargeAuthorization) {
    return await this.http<GetTransactionResponse>(
      '/transaction/charge_authorization',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async checkAuthorization(data: CheckAuthorization) {
    return await this.http<CheckAuthorizationResponse>(
      '/transaction/check_authorization',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async viewTimeline(id: string) {
    return await this.http<Timeline>('/transaction/timeline/:id', {
      params: { id },
    });
  }

  async total(queryParams: ListTransactionQueryParams) {
    return await this.http<ListTransactions>('/transaction/totals', {
      query: { ...queryParams },
    });
  }

  async export(queryParams: ListTransactionQueryParams) {
    return await this.http<ExportTransaction>('/transaction/export', {
      query: { ...queryParams },
    });
  }

  async partialDebit(data: PartialDebit) {
    return await this.http<PartialDebitResponse>('/transaction/partial_debit', {
      method: 'POST',
      body: data,
    });
  }
}
