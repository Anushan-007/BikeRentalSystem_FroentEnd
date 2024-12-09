import { Pipe, PipeTransform } from '@angular/core';
import { rentalRequest } from '../Models/rentalRequest';

@Pipe({
  name: 'rentalRequest',
  standalone: true
})
export class RentalRequestPipe implements PipeTransform {

  
  transform(value: rentalRequest[], searchText: string): rentalRequest[] {
    if (!searchText) {
      return value;  // If no search text, return the original list of users
    }

    const searchLower = searchText.trim().toLowerCase();  // Convert searchText to lowercase for case-insensitive comparison

    return value.filter(user => {
      return user.nicNumber.toLowerCase().includes(searchLower);  // Match nicNumber with search text
    });
  }

}
