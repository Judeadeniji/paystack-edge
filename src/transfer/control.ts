import { TPaysackFetch } from '../fetch';
import { Response } from '../interface';
import {
  CheckBalanceResponse,
  LedgerBalanceResponse,
  ResendTransferOTP,
} from './interface';

export class Control {
  http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async balance() {
    return await this.http<CheckBalanceResponse>('/balance');
  }

  async ledgerBalance() {
    return await this.http<LedgerBalanceResponse>('/ledger_balance');
  }

  async resendOTP(data: ResendTransferOTP) {
    return await this.http<Response>('/transfer/resend_otp', {
      method: 'POST',
      body: data,
    });
  }

  async disableOTP() {
    return await this.http<Response>('/transfer/disable_otp');
  }

  async finalizeDisableOTP(otp: string) {
    return await this.http<Response>('/transfer/disable_otp', {
      method: 'POST',
      body: { otp },
    });
  }

  async enableOTP() {
    return await this.http<Response>('/transfer/enable_otp');
  }
}
