import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];
  productsChanged = new Subject<Product[]>();

  URL = "http://localhost:8080/products";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getProducts() {
      this.http.get<Product[]>(this.URL).subscribe(
        products => {
          this.products = products ? products?.slice() : [];
          this.productsChanged.next(this.products?.slice());
        }
      )
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
    return this.http.put(this.URL, this.products);
  }

  addProduct(product: Product) {
    this.products.push(product);
    return this.http.put(this.URL, this.products);
  }

  updateProduct(product: Product, id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = product;
        this.productsChanged.next(this.products.slice());
        break;
      }
    }
    return this.http.put(this.URL, this.products);
  }

}
