import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], searchText: string): any[] {
    if (!products)
      return [];
    if (!searchText)
      return products;

    searchText = searchText.toLowerCase();
    const regex = new RegExp(searchText);
    
    return products.filter(
      product => regex.test(product.name.toLowerCase())
    );
  }
}
