import { Pipe, PipeTransform } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';

@Pipe({
  name: 'rentalRecord',
  standalone: true
})
export class RentalRecordPipe implements PipeTransform {

  transform(value: rentalRecord[], searchText: string): rentalRecord[] {
    if (!searchText) {
      return value;  // If no search text, return the original list of users
    }

    const searchLower = searchText.trim().toLowerCase();  // Convert searchText to lowercase for case-insensitive comparison

    return value.filter(user => {
      console.log(user);
      
      return user.rentalRequest.nicNumber.toLowerCase().includes(searchLower);  // Match nicNumber with search text
    });
  }

}
