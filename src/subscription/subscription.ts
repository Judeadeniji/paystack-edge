import { TPaysackFetch } from '../fetch';
import {
  CreateSubscription,
  EnableOrDisableSubscription,
  FetchSubscription,
  GenerateSubscriptionLink,
  ListSubscriptionQueryParams,
  ListSubscriptions,
  Response,
  SubscriptionCreated,
} from './interface';

interface BadRequest {
  status: boolean;
  message: string;
}

export class Subscription {
  http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreateSubscription) {
    return await this.http<SubscriptionCreated | BadRequest>('/subscription', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: ListSubscriptionQueryParams) {
    return await this.http<ListSubscriptions | BadRequest>('/subscription', {
      query: { ...queryParams },
    });
  }

  async fetch(idOrCode: string) {
    return await this.http<FetchSubscription | BadRequest>(
      'subscription/:idOrCode',
      {
        params: { idOrCode },
      },
    );
  }

  async enable(data: EnableOrDisableSubscription) {
    return await this.http<Response | BadRequest>('/subscription/enable', {
      method: 'POST',
      body: data,
    });
  }

  async disable(data: EnableOrDisableSubscription) {
    return await this.http<Response | BadRequest>('/subscription/disable', {
      method: 'POST',
      body: data,
    });
  }

  async generateSubscriptionLink(code: string) {
    return await this.http<GenerateSubscriptionLink | BadRequest>(
      '/subscription/:code/manage/link',
      {
        params: { code },
      },
    );
  }

  async sendUpdateSubscriptionLink(code: string) {
    return await this.http<Response | BadRequest>(
      '/subscription/:code/manage/email',
      {
        method: 'POST',
        params: { code },
      },
    );
  }
}
