import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = null;
  id: string;

  fetching = false;

  name: FormControl;
  amount: FormControl;
  quantity: FormControl;
  desc: FormControl;
  imgUrl: FormControl;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.fetching = true;
          this.productService.getProduct(params['id']).subscribe(
            product => {
              this.product = product;
              console.log(this.product);
              this.fetching = false;
            }
          )
          this.id = params['id'];
        }
      }
    )
    this.name = new FormControl(this.product ? this.product.name : '', [Validators.required]);
    this.amount = new FormControl(this.product ? this.product.amount : 0, [Validators.required]);
    this.desc = new FormControl(this.product ? this.product.description : '', [Validators.required]);
    this.imgUrl = new FormControl(this.product ? this.product.imgUrl : '', [Validators.required]);
    this.quantity = new FormControl(this.product ? this.product.quantity : 1, [Validators.min(1), Validators.required]);
  }

  onSubmit() {
    let uuid = uuidv4();
    console.log(uuid);
    const product = new Product(this.name.value, this.desc.value, this.quantity.value, this.amount.value, this.imgUrl.value, this.product ? this.product.id : uuid);
    if (this.name.valid && this.amount.valid && this.quantity.valid && this.desc.valid && this.imgUrl.valid) {
      if (this.product) {
        this.productService.updateProduct(product, this.id);
      } else {
        this.productService.addProduct(product);
      }
      this.router.navigate(["products"]);
      // setTimeout(() => {this.router.navigate(["products"])}, 3000);
    } else {
      alert("Not valid");
    }
  }

  onCancel() {
    this.router.navigate(['products']);
  }

  onReset() {
    this.name.reset('');
    this.quantity.reset(1);
    this.amount.reset(0);
    this.imgUrl.reset('');
    this.desc.reset('');
  }

}
