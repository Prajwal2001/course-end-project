import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  product: Product;
  id: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.product = this.productService.getProduct(this.id)
      }
    )
  }

  onDeleteClicked() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['products']);
  }

  onCancelClicked() {
    this.router.navigate(['products']);
  }

}
