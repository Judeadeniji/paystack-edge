import {
  CreatePlan,
  ListPlanQueryParams,
  PlanResponse,
  UpdatePlan,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * ## Plans
 * The Plans API allows you create and manage installment
 * payment options on your integration
 * @class Plan
 */
export class Plan {
  private http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }
  /**
   * ### Create Plan
   * Create a plan on your integration
   * @param {CreatePlan} data Body Parameters
   */
  async create(data: CreatePlan) {
    return await this.http<PlanResponse>('/plan', {
      method: 'POST',
      body: data,
    });
  }
  /**
   * ### List Plans
   * List plans available on your integration
   * @param queryParams Query Parameters
   */
  async list(queryParams?: ListPlanQueryParams) {
    return await this.http<PlanResponse>('/plan', {
      query: { ...queryParams },
    });
  }
  /**
   * ### Fetch Plan
   * Get details of a plan on your integration
   * @param id The plan `ID` or `code` you want to fetch
   */
  async fetch(id: string) {
    return await this.http<PlanResponse>('/plan/:id', {
      params: { id },
    });
  }
  /**
   * ### Update Plan
   * Update a plan details on your integration
   * @param id Plans's `ID` or `code`
   * @param {UpdatePlan} data Update Plan Data
   */
  async update(id: string, data: UpdatePlan) {
    return await this.http<PlanResponse>('/plan/:id', {
      method: 'PUT',
      params: { id },
      body: data,
    });
  }
}
