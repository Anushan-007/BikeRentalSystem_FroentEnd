import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from '../Models/bike';

@Pipe({
  name: 'brandModel',
  standalone: true
})
export class BrandModelPipe implements PipeTransform {

  transform(value: Bike[], searchText: string): Bike[] {
    if (!searchText) {
      return value; // No search text, return all bikes
    }

    const searchLower = searchText.trim().toLowerCase(); // Make the search case-insensitive

    return value.filter(bike => {
      const brandMatch = bike.brand.trim().toLowerCase().includes(searchLower);
      const modelMatch = bike.model.trim().toLowerCase().includes(searchLower);
      return brandMatch || modelMatch; // Match either brand or model
    });
  }
}
