import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from '../event.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  @Input() id: number;
  @Input() product: Product;
  @ViewChild("accordionItem") accordionItem: CdkAccordionItem;

  constructor(private router: Router, public dialog: MatDialog) {}
  
  ngOnInit(): void {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: this.id,
        name: this.product.name
      }
    });

  }
  onAccordionItemClicked() {
    this.accordionItem.toggle()
    document.title = this.accordionItem.expanded ? this.product.name : 'Product Management';
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ["./dialog.component.css"]
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private productService: ProductService,
    private eventService: EventService) {}

  onDelete() {
    this.productService.deleteProduct(this.data.id).subscribe(
      res => {
        this.eventService.eventEmitter.next(true);
        this.dialogRef.close();
        this.router.navigate(['products']);
      }
    );
  }

  onNo() {
    this.dialogRef.close();
  }
}