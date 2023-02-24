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

  form: FormGroup

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      quantity: new FormControl(),
      amount: new FormControl(),
      imgUrl: new FormControl(),
      description: new FormControl()
    })
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.fetching = true;
          this.productService.getProduct(params['id']).subscribe(
            product => {
              this.product = product;
              console.log(this.product);
              this.form.patchValue({
                name: this.product.name,
                quantity: this.product.quantity,
                amount: this.product.amount,
                imgUrl: this.product.imgUrl,
                description: this.product.description
              });
              this.fetching = false;
            }
          )
          this.id = params['id'];
        }
      }
    )
  }

  onSubmit() {
    let uuid = uuidv4();
    const product = new Product(this.form.controls["name"].value, this.form.controls["description"].value, this.form.controls["quantity"].value, this.form.controls["amount"].value, this.form.controls["imgUrl"].value, this.product ? this.product.id : uuid);
    if (this.form.valid) {
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
    this.form.reset();
  }

}
