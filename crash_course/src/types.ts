import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
type ParamType =
  | string
  | number
  | boolean
  | ReadonlyArray<string | number | boolean>;

export interface OptionsType {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]: ParamType;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  rating: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
export interface PaginationParams {
  [key: string]: ParamType;
  page: number;
  perPage: number;
}
