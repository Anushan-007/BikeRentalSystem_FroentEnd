import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/users';

@Pipe({
  name: 'customerNic',
  standalone: true
})
export class CustomerNicPipe implements PipeTransform {

  transform(value: User[], searchText: string): User[] {
    if (!searchText) {
      return value;  // If no search text, return the original list of users
    }

    const searchLower = searchText.trim().toLowerCase();  // Convert searchText to lowercase for case-insensitive comparison

    return value.filter(user => {
      return user.nicNumber.toLowerCase().includes(searchLower);  // Match nicNumber with search text
    });
  }
}
