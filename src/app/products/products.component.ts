import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventService } from './event.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchText: FormControl = new FormControl('');
  products: Product[];
  fetching = false;
  fetchingTypes = false;

  constructor(public productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private eventService: EventService) { }

  fetchProducts() {
    this.fetching = true;
    this.productService.getProducts();
    this.productService.productsChanged.subscribe(
      products => {
        this.products = products.slice();
        this.fetching = false;
      }
    );
    this.fetchingTypes = true;
    this.productService.getProductTypes();
    this.productService.productTypesChanged.subscribe(
      productTypes => {
        this.fetchingTypes = false;
      }
    )
  }

  ngOnInit(): void {
    this.eventService.eventEmitter.subscribe(
      res => {
        this.fetchProducts();
        return;
      }
    )
    this.fetchProducts();
    document.title = "Product Management";
  }

  onAddNewProductClicked() {
    this.router.navigate(['products', 'new']);
  }

}
