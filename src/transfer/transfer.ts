import { TPaysackFetch } from '../fetch';
import { Control } from './control';
import {
  BulkTransferInitiated,
  FetchTransfer,
  FinalizeTransfer,
  InitiateBulkTransfer,
  InitiateTransfer,
  ListTransferQueryParams,
  ListTransfers,
  TransferInitiated,
  VerifyTransfer,
} from './interface';

export class Transfer {
  private http: TPaysackFetch;
  public control: Control;
  constructor(http: TPaysackFetch) {
    this.http = http;
    this.control = new Control(http);
  }

  /**
   * # Initiate Transfer
   * Status of transfer object returned will be `pending` if OTP is disabled.
   * In the event that an OTP is required, status will read `otp`.
   */
  async initiate(data: InitiateTransfer) {
    return await this.http<TransferInitiated>('/transfer', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * # Finalize Transfer
   * Finalize an initiated transfer
   */
  async finalize(transferCode: string, otp: string) {
    return await this.http<FinalizeTransfer>('/transfer/finalize', {
      method: 'POST',
      body: { transferCode, otp },
    });
  }

  async bulk(data: InitiateBulkTransfer) {
    return await this.http<BulkTransferInitiated>('/transfer/bulk', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: ListTransferQueryParams) {
    return await this.http<ListTransfers>('/transfer', {
      query: { ...queryParams },
    });
  }

  async fetch(idOrCode: string) {
    return await this.http<FetchTransfer>('/transfer/:idOrCode', {
      params: { idOrCode },
    });
  }

  async verify(reference: string) {
    return await this.http<VerifyTransfer>('/transfer/verify/:reference', {
      params: { reference },
    });
  }
}
