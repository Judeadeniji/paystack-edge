import {
  CreateProduct,
  FetchProduct,
  ListProductQueryParams,
  ListProducts,
  ProductCreated,
  UpdateProduct,
} from './interface';
import { TPaysackFetch } from '../fetch';

/**
 * @class Product
 * # Producs
 * The products API allows you create and manage inventories
 * on your integration
 */
export class Product {
  http: TPaysackFetch;
  constructor(http: TPaysackFetch) {
    this.http = http;
  }

  async create(data: CreateProduct) {
    return await this.http<ProductCreated>('/product', {
      method: 'POST',
      body: data,
    });
  }

  async list(queryParams?: ListProductQueryParams) {
    return await this.http<ListProducts>('/product', {
      query: { ...queryParams },
    });
  }

  async fetch(id: string) {
    return await this.http<FetchProduct>('/product/:id', {
      params: { id },
    });
  }

  async update(id: string, data: CreateProduct) {
    return await this.http<UpdateProduct>('/product/:id', {
      method: 'PUT',
      params: { id },
      body: data,
    });
  }
}
