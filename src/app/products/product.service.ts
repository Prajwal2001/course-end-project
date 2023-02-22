import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, Subject, filter, map } from 'rxjs';
import { DataStorageService } from '../data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] | any;
  productsChanged = new Subject<Product[]>();
  isFetching : boolean;

  constructor(
    private dataStorageService: DataStorageService
  ) { 
    this.products = [
      new Product("Mi phone", "Fugiat deserunt amet minim cillum minim. Aute amet est eu occaecat cupidatat proident dolore. Minim est qui occaecat et pariatur fugiat excepteur tempor veniam Lorem. Nostrud velit laborum voluptate mollit commodo culpa. Consectetur minim laborum esse eiusmod quis Lorem labore minim dolore non reprehenderit veniam. Quis Lorem occaecat aute ex aliqua ad velit pariatur amet aliquip cupidatat.", 2, 10000, 'https://img.freepik.com/free-psd/full-screen-smartphone-mockup-design_53876-65968.jpg', 'd35c0130-70f0-4b09-8b8d-faa4b70b7750'),
      new Product("Vivo phone", "Dolore ipsum ad ullamco magna sunt velit. In mollit excepteur ad deserunt adipisicing Lorem non in ipsum occaecat aliqua ex nulla. Amet nulla ea excepteur esse eu magna.", 3, 12000, 'https://img.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-65749.jpg', 'f9d15b13-42f8-4070-b8e0-f6f02ad541f7'),
      new Product("Dell laptop", "Laborum enim ex eiusmod incididunt est mollit aliquip aliquip ea ut in consectetur ad exercitation. Cupidatat aute magna ullamco mollit enim aute tempor eu dolore. Velit esse anim incididunt in. Sit tempor tempor occaecat mollit est sit.", 2, 70000, "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dell_Inspiron_14_3421_Laptop.jpg/220px-Dell_Inspiron_14_3421_Laptop.jpg", "b5f4cf31-ffc7-4eee-af9d-659009d79565"),
      new Product("HP laptop", "Enim enim nulla quis sunt consequat in ullamco fugiat adipisicing. Proident proident pariatur pariatur ad. Officia quis labore elit elit. Laborum labore eiusmod dolore non ad ea tempor. Nisi do culpa ex pariatur aute cupidatat officia. Quis sint minim commodo anim minim.", 4, 55000, "https://upload.wikimedia.org/wikipedia/commons/b/bf/HP_Pavilion_dv2500se.jpg", "90f089e2-2c75-4bb7-b656-f99ff8afc993")
    ];
  }

  getProducts() {
    // this.dataStorageService.fetchProduct(1).subscribe(
    //   product => {console.log(product);}
    // )
    // return this.dataStorageService.fetchProducts();
    return this.products.slice();
  }

  getProduct(id: string): Product {
    for (let product of this.products)
      if (product.id === id)
        return product;
    return null;
  }

  deleteProduct(id: string) {
    let products: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (id !== this.products[i].id) {
        products.push(this.products[i])
      }
    }
    this.products = products.slice();
    this.productsChanged.next(this.products.slice());
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(product: Product, id: string) {
    for (let i = 0; i < this.products.length; i++) {
      if (id === this.products[i].id) {
        this.products[i] = {...product};
      } 
    }
    // return this.dataStorageService.updateProducts(this.products);
    this.productsChanged.next(this.products.slice());
  }

}
