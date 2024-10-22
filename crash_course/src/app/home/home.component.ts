import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }
  onConfirmEdit(product: Product) {
    this.editProduct(product);
    this.displayEditPopup = false;
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }
  toggleAddPopup() {
    this.displayAddPopup = true;
  }
  toggleDeletePopup(product: Product) {
    this.deleteProduct(product);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  onRequestError(error: any) {
    console.log(error);
  }

  onRequestSucceed(data: any) {
    console.log(data);
    this.fetchProducts(0, this.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts({ page, perPage }).subscribe({
      next: (products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      },
      error: this.onRequestError,
    });
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product).subscribe({
      next: this.onRequestSucceed,
      error: this.onRequestError,
    });
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe({
      next: this.onRequestSucceed,
      error: this.onRequestError,
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: this.onRequestSucceed,
      error: this.onRequestError,
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
