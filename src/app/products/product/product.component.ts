import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  @Input() id: number;
  @Input() product: Product;
  @ViewChild("accordionItem") accordionItem: CdkAccordionItem;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
  }

  onAccordionItemClicked() {
    this.accordionItem.toggle()
    document.title = this.accordionItem.expanded ? this.product.name : 'Product Management';
  }

}
