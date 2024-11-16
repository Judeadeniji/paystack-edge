import {
  ChargeCreatedWithAddressResponse,
  ChargeCreatedWithBirthdayResponse,
  ChargeCreatedWithOTPResponse,
  ChargeCreatedWithPendingResponse,
  ChargeCreatedWithPhoneResponse,
} from './interface';
import {
  ChargeCreatedResponse,
  ChargeCreatedWithPinResponse,
  CreateCharge,
  SubmitAddress,
  SubmitBirthday,
  SubmitOTP,
  SubmitPhone,
  SubmitPIN,
} from './interface';
import { TPaysackFetch } from '../fetch';

export class Charge {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }
  async create(data: CreateCharge) {
    // return await this.http.post('/charge', JSON.stringify(data));
    return await this.http<ChargeCreatedResponse>('/charge', {
      method: 'POST',
      body: data,
    });
  }

  async submitPIN(data: SubmitPIN) {
    // return await this.http.post('/charge/submit_pin', JSON.stringify(data));
    return await this.http<ChargeCreatedWithPinResponse>('/charge/submit_pin', {
      method: 'POST',
      body: data,
    });
  }

  async submitOTP(data: SubmitOTP) {
    return await this.http<ChargeCreatedWithOTPResponse>('/charge/submit_otp', {
      method: 'POST',
      body: data,
    });
  }

  async submitPhone(data: SubmitPhone) {
    return await this.http<ChargeCreatedWithPhoneResponse>(
      '/charge/submit_phone',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async submitBirthday(data: SubmitBirthday) {
    return await this.http<ChargeCreatedWithBirthdayResponse>(
      '/charge/submit_birthday',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async submitAddress(data: SubmitAddress) {
    return await this.http<ChargeCreatedWithAddressResponse>(
      '/charge/submit_address',
      {
        method: 'POST',
        body: data,
      },
    );
  }

  async checkPending(reference: string) {
    return await this.http<ChargeCreatedWithPendingResponse>(
      '/charge/check_pending/:reference',
      {
        params: { reference },
      },
    );
  }
}
