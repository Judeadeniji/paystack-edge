import {
  ResolveAccount,
  ValidateAccount,
  AccountVerifiedResponse,
  BinResolvedResponse,
  AccountResolved,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * ## Verification
 * The Verification API allows you perform KYC processes.
 */
export class Verification {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  /**
   * #### Resolve Account
   * Confirm an account belongs to the right customer
   * @param {ResolveAccount} data **Query Param**
   */
  async resolveAccount(data: ResolveAccount) {
    return await this.http<AccountResolved>('/bank/resolve', {
      query: { ...data },
    });
  }

  /**
   * #### Validate Account
   * Confirm the authenticity of a customer's account number
   * before sending money
   * @param {ValidateAccount} data **Data Param**
   */
  async validateAccount(data: ValidateAccount) {
    return await this.http<AccountVerifiedResponse>('/bank/validate', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * #### Resolve Card BIN
   * Get more information about a customer's card
   * using the first 6 characters of the card
   * @param {string} bin **Path Param**
   */
  async resolveCard(bin: number) {
    return await this.http<BinResolvedResponse>('/card/resolve/:bin', {
      params: { bin },
    });
  }
}
