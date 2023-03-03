import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
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
  invalid = false;

  form: FormGroup

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.product = this.productService.getProduct(params['id']);
          this.id = params['id'];
        }
      }
    )
    this.form = new FormGroup({
      name: new FormControl(this.product ? this.product.name : '', [Validators.required, Validators.minLength(3)]),
      quantity: new FormControl(this.product ? this.product.quantity : 1, [Validators.required, Validators.min(1), Validators.max(10)]),
      amount: new FormControl(this.product ? this.product.amount : 1, [Validators.required, Validators.min(1)]),
      imgUrl: new FormControl(this.product ? this.product.imgUrl : '', [Validators.required]),
      description: new FormControl(this.product ? this.product.description : '', [Validators.required, Validators.minLength(10)]),
    })
  }

  onSubmit() {
    let today = new Date().toJSON().slice(0,10);
    const product = new Product(
      this.form.controls["name"].value,
      this.form.controls["description"].value,
      this.form.controls["quantity"].value,
      this.form.controls["amount"].value,
      this.form.controls["imgUrl"].value,
      this.product ? this.product.id : uuidv4(),
      this.product ? this.product.addedDate : today,
      today
    );

    if (this.form.valid) {
      this.fetching = true;
      if (this.product) {
        this.productService.updateProduct(product, this.id).subscribe(res => {
          this.fetching = false;
          this.router.navigate(['products']);
        });
      } else {
        this.productService.addProduct(product).subscribe(res => {
          this.fetching = false;
          this.router.navigate(['products']);
        });
      }
    } else {
      this.invalid = true;
      setTimeout(() => { this.invalid = false; }, 2000)
    }
  }

  onCancel() {
    this.router.navigate(['products']);
  }

  onReset() {
    this.form.reset();
  }

}
