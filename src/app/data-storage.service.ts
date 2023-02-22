import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products/product.model';
import { map, tap } from 'rxjs';
import { ProductService } from './products/product.service';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  URL = "https://product-management-d65eb-default-rtdb.firebaseio.com/products.json";

  constructor(private http: HttpClient) { }

  fetchProducts() {
    return this.http.get<Product[]>(this.URL);
  }

  fetchProduct(id: number) {
    return this.http.get<Product>(this.URL + "/" + id);
  }

  updateProducts(products: Product[]) {
    return this.http.put(this.URL, products);
  }

}
