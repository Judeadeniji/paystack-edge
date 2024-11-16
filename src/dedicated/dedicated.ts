import {
  CreateDedicatedVirtualAccount,
  DeactivateDedicatedAccountResponse,
  DedicatedAccountCreatedResponse,
  FetchBankProvidersResponse,
  FetchDedicatedVirtualAccountResponse,
  ListDedicatedVirtualAccountsQueryParams,
  ListDedicatedVirtualAccountsResponse,
  RemoveSplitDedicatedAccountResponse,
  SplitDedicatedAccountTransaction,
  SplitDedicatedAccountTransactionResponse,
} from './interface';
import { TPaysackFetch } from '../fetch';

export class DedicatedAccount {
  http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreateDedicatedVirtualAccount) {
    return await this.http<DedicatedAccountCreatedResponse>(
      '/dedicated_account',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async list(queryParams: ListDedicatedVirtualAccountsQueryParams) {
    return await this.http<ListDedicatedVirtualAccountsResponse>(
      '/dedicated_account',
      {
        query: { ...queryParams },
      },
    );
  }

  async fetch(dedicatedAccountId: string) {
    return await this.http<FetchDedicatedVirtualAccountResponse>(
      '/dedicated_account/:dedicatedAccountId',
      {
        params: { dedicatedAccountId },
      },
    );
  }

  async deactivate(dedicatedAccountId: string) {
    return await this.http<DeactivateDedicatedAccountResponse>(
      '/dedicated_account/:dedicatedAccountId',
      {
        method: 'DELETE',
        params: { dedicatedAccountId },
      },
    );
  }

  async splitTransaction(data: SplitDedicatedAccountTransaction) {
    return await this.http<SplitDedicatedAccountTransactionResponse>(
      '/dedicated_account/split',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async removeSplit(accountNumber: string) {
    return await this.http<RemoveSplitDedicatedAccountResponse>(
      '/dedicated_account/remove_split/:accountNumber',
      {
        method: 'DELETE',
        params: { accountNumber },
      },
    );
  }

  async providers() {
    return await this.http<FetchBankProvidersResponse>(
      '/dedicated_account/providers',
    );
  }
}
