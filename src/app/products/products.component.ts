import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchText: FormControl = new FormControl('');
  products: Product[];
  fetching = false;

  constructor(public productService: ProductService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.productService.productsChanged.subscribe(
      (products) => {
        this.products = products;
      }
    )
    this.fetching = true;
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.fetching = false;
      }
    )
    // this.products = this.productService.getProducts();
    document.title = "Product Management";
  }

  onAddNewProductClicked() {
    this.router.navigate(['products','new']);
  }

}
