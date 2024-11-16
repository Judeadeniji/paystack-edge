import { TPaysackFetch } from '../fetch';
import {
  DomainRegisterResponse,
  ListDomainsResponse,
  UnregisterDomainRegisterResponse,
} from './interface';

export class ApplePay {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async registerDomain(domainName: string) {
    return await this.http<DomainRegisterResponse>('/apple-pay', {
      method: 'POST',
      body: { domainName },
    });
  }

  async listDomains() {
    return await this.http<ListDomainsResponse>('/apple-pay');
  }

  async unregisterDomain(domainName: string) {
    return await this.http<UnregisterDomainRegisterResponse>(
      '/apple-pay/:domainName',
      {
        method: 'DELETE',
        params: { domainName },
      },
    );
  }
}
