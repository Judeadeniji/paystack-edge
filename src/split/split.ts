import {
  CreateSplit,
  ListSplitQueryParams,
  ListSplitsResponse,
  Response,
  SplitCreatedResponse,
  SplitSubAccount,
  TransactionSplitResponse,
  UpdateTransactionSplit,
  UpdateTransactionSplitResponse,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * The Transaction Splits API enables merchants
 * split the settlement for a transaction across
 * their payout account, and one or more Subaccounts.
 */
export class TransactionSplit {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  /**
   * Create a split payment on your integration
   */
  async create(data: CreateSplit) {
    return await this.http<SplitCreatedResponse>('/split', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * List/search for the transaction splits available on your integration.
   */
  async list(queryParams?: ListSplitQueryParams) {
    return await this.http<ListSplitsResponse>('/split', {
      query: { ...queryParams },
    });
  }

  /**
   * Get details of a split on your integration.
   */
  async fetch(splitId: string) {
    return await this.http<TransactionSplitResponse>('split/:splitId', {
      params: {
        splitId,
      },
    });
  }

  /**
   * Update a transaction split details on your integration
   */
  async update(splitId: string, data: UpdateTransactionSplit) {
    return await this.http<UpdateTransactionSplitResponse>('/split/:splitId', {
      method: 'PUT',
      params: { splitId },
      body: data,
    });
  }

  /**
   * Add a Subaccount to a Transaction Split,
   * or update the share of an existing Subaccount in a Transaction Split
   */
  async add(splitId: string, data: SplitSubAccount) {
    return await this.http<Response>('/split/:splitId/subaccount', {
      method: 'POST',
      params: { splitId },
      body: data,
    });
  }

  /**
   * Remove a subaccount from a transaction split
   */
  async remove(splitId: string, subaccount: string) {
    return await this.http<Response>('/split/:splitId/subaccount/:subaccount', {
      method: 'DELETE',
      params: { splitId, subaccount },
    });
  }
}
