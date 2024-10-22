import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, ProductsResponse } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {
    apiService.setBaseURL('http://localhost:3000'); //TODO: env
  }

  getProducts = (params: PaginationParams): Observable<ProductsResponse> => {
    return this.apiService.get('clothes', {
      params,
      responseType: 'json',
    });
  };

  addProduct = (body: Product): Observable<Product> => {
    return this.apiService.post('clothes', body, {});
  };

  editProduct = (body: Product): Observable<Product> => {
    return this.apiService.put(`clothes/${body.id}`, body, {});
  };

  deleteProduct = (id: number): Observable<any> => {
    return this.apiService.delete(`clothes/${id}`, {});
  };
}
