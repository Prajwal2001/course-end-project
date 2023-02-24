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

  products: Product[] | any;
  productsChanged = new Subject<Product[]>();
  static isFetching: boolean;

  URL = "https://product-management-d65eb-default-rtdb.firebaseio.com/products.json";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    ProductService.isFetching = false;
    // this.products = [
    //   new Product("Mi phone", "Fugiat deserunt amet minim cillum minim. Aute amet est eu occaecat cupidatat proident dolore. Minim est qui occaecat et pariatur fugiat excepteur tempor veniam Lorem. Nostrud velit laborum voluptate mollit commodo culpa. Consectetur minim laborum esse eiusmod quis Lorem labore minim dolore non reprehenderit veniam. Quis Lorem occaecat aute ex aliqua ad velit pariatur amet aliquip cupidatat.", 2, 10000, 'https://img.freepik.com/free-psd/full-screen-smartphone-mockup-design_53876-65968.jpg', 'd35c0130-70f0-4b09-8b8d-faa4b70b7750'),
    //   new Product("Vivo phone", "Dolore ipsum ad ullamco magna sunt velit. In mollit excepteur ad deserunt adipisicing Lorem non in ipsum occaecat aliqua ex nulla. Amet nulla ea excepteur esse eu magna.", 3, 12000, 'https://img.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-65749.jpg', 'f9d15b13-42f8-4070-b8e0-f6f02ad541f7'),
    //   new Product("Dell laptop", "Laborum enim ex eiusmod incididunt est mollit aliquip aliquip ea ut in consectetur ad exercitation. Cupidatat aute magna ullamco mollit enim aute tempor eu dolore. Velit esse anim incididunt in. Sit tempor tempor occaecat mollit est sit.", 2, 70000, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dell_Inspiron_14_3421_Laptop.jpg/220px-Dell_Inspiron_14_3421_Laptop.jpg", "b5f4cf31-ffc7-4eee-af9d-659009d79565"),
    //   new Product("HP laptop", "Enim enim nulla quis sunt consequat in ullamco fugiat adipisicing. Proident proident pariatur pariatur ad. Officia quis labore elit elit. Laborum labore eiusmod dolore non ad ea tempor. Nisi do culpa ex pariatur aute cupidatat officia. Quis sint minim commodo anim minim.", 4, 55000, "https://upload.wikimedia.org/wikipedia/commons/b/bf/HP_Pavilion_dv2500se.jpg", "90f089e2-2c75-4bb7-b656-f99ff8afc993")
    // ];
  }

  getProducts() {
    return this.http.get<Product[]>(this.URL)
  }

  getProduct(id: string) {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.id === id)[0])
    )
  }

  deleteProduct(id: string) {
    this.products = [];
    this.getProducts().subscribe({
      next: products => {
        for (let i = 0; i < products.length; i++) {
          if (id !== products[i].id) {
            this.products.push(this.products[i]);
          }
        }
      },
      complete: () => { this.http.put(this.URL, this.products).subscribe(res => res); }
    })
    // this.products = products.slice();
    // this.productsChanged.next(this.products.slice());
  }

  addProduct(product: Product) {
    this.getProducts().subscribe(
      products => {
        this.http.put(this.URL, [...products, product]).subscribe(res => res);
      }
    )
  }

  updateProduct(product: Product, id: string) {
    console.log(JSON.stringify(product), id);
    this.getProducts().subscribe(
      {
        next: products => {
          this.products = products;
        },
        complete: () => {
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id)
              this.products[i] = product;
          }
          this.http.put(this.URL, this.products).subscribe(res => res);
        }
      }
    )
  }

}
