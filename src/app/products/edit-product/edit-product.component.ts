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
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.product = this.productService.getProduct(params['id']);
          this.id = params['id'];
        }
      }
      )
      this.form = new FormGroup({
        name: new FormControl(this.product ? this.product.name : ''),
        quantity: new FormControl(this.product ? this.product.quantity : 1),
        amount: new FormControl(this.product ? this.product.amount : 1),
        imgUrl: new FormControl(this.product ? this.product.imgUrl : ''),
        description: new FormControl(this.product ? this.product.description : '')
      })
    }

  onSubmit() {
    let uuid = uuidv4();
    const product = new Product(
      this.form.controls["name"].value,
      this.form.controls["description"].value,
      this.form.controls["quantity"].value,
      this.form.controls["amount"].value,
      this.form.controls["imgUrl"].value,
      this.product ? this.product.id : uuid
    );
    if (this.form.valid) {
      if (this.product) {
        this.productService.updateProduct(product, this.id).subscribe(res => {
          this.router.navigate(['products']);
        });
      } else {
        this.productService.addProduct(product).subscribe(res => {
          this.router.navigate(['products']);
        });
      }
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
