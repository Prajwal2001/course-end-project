import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { ProductType } from './product_type.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];
  productTypes: ProductType[];
  productsChanged = new Subject<Product[]>();
  productTypesChanged = new Subject<ProductType[]>();

  PRODUCTS_URL = "http://localhost:8080/products";
  PRODUCT_TYPES_URL = this.PRODUCTS_URL + "/types";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getProducts() {
      this.http.get<Product[]>(this.PRODUCTS_URL).subscribe(
        products => {
          this.products = products ? products?.slice() : [];
            this.productsChanged.next(this.products?.slice());
        }
      );
  }

  getProduct(id: string) {
    return this.products.filter(product => product.id === id)[0];
  }

  deleteProduct(id: string) {
    let newProducts: Product[] = []
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id !== id) {
        newProducts.push({...this.products[i]});
      }
    }
    this.products = newProducts.slice();
    return this.http.delete(this.PRODUCTS_URL + "/" + id);
  }

  addProduct(product: Product) {
    this.products.push(product);
    return this.http.post(this.PRODUCTS_URL, product);
  }

  updateProduct(product: Product, id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = product;
        this.productsChanged.next(this.products.slice());
        break;
      }
    }
    return this.http.put(this.PRODUCTS_URL, product);
  }

  getProductTypes() {
    this.http.get<ProductType[]>(this.PRODUCT_TYPES_URL).subscribe(
      productTypes => {
        this.productTypes = productTypes ? productTypes.slice() : [];
        this.productTypesChanged.next(this.productTypes);
      }
    )
  }

  getProductType(id: number) {
    return this.productTypes.filter(type => type.id === id)[0];
  }

}
