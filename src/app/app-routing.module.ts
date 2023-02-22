import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';

const routes: Routes = [
  {path: "", redirectTo: "products", pathMatch: "full"},
  {path: "products", children: [
    {path: "", component: ProductsComponent, pathMatch: "full"},
    {path: ":id/edit", component: EditProductComponent},
    {path: ":id/delete", component: DeleteProductComponent},
    {path: "new", component: EditProductComponent}
  ]},
  {path: 'something', component: PageNotFoundComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
