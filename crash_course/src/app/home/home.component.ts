import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts({ page, perPage }).subscribe({
      next: (products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
