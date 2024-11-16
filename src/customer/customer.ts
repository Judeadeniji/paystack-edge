import { Response } from '../interface';
import { ListCustomersResponse } from './interface';
import {
  CreateCustomer,
  CustomerCreated,
  FetchCustomerResponse,
  ListCustomerQueryParams,
  SetRiskAction,
  UpdateCustomer,
  ValidateCustomer,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * # Customers
 * The Customers API allows you create and manage
 * customers on your integration
 */
export class Customer {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  /**
   * ## Create Customer
   * Create a customer on your integration
   * @param {CreateCustomer} data
   */
  async create(data: CreateCustomer) {
    return await this.http<CustomerCreated>('/customer', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * ## List Customers
   * List customers available on your integration
   */
  async list(queryParams?: ListCustomerQueryParams) {
    return await this.http<ListCustomersResponse>('/customer', {
      query: { ...queryParams },
    });
  }

  /**
   * ## Fetch Customer
   * Get details of a customer on your integration
   * @param {String} email_or_code
   */
  async fetch(emailCode: string) {
    return await this.http<FetchCustomerResponse>('customer/:emailCode', {
      params: { emailCode },
    });
  }

  /**
   * ## Update CUstomer
   * Update a customer's details on your integration
   */
  async update(code: string, data: UpdateCustomer) {
    return await this.http<FetchCustomerResponse>('/customer/:code', {
      method: 'PUT',
      params: { code },
      body: data,
    });
  }

  /**
   * ## Validate Customer
   * Validate a customer's identity
   */
  async validate(customerCode: string, data: ValidateCustomer) {
    return await this.http<Response>('/customer/verify/:customerCode', {
      method: 'POST',
      params: { customerCode },
      body: data,
    });
  }

  /**
   * ## Whitelist/Blacklist Customer
   * Whitelist or black a customer on your integration
   */
  async setRiskAction(data: SetRiskAction) {
    return await this.http<FetchCustomerResponse>('/customer/set_risk_action', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * ## Deactivate Authorization
   * Deactivate an authorization when the card needs to be forgotten
   */
  async deactivateAutorization(authorizationCode: string) {
    return await this.http<Response>(
      '/customer/deactivate_authorization/:authorizationCode',
      {
        params: { authorizationCode },
      },
    );
  }
}
