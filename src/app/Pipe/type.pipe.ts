import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from '../Models/bike';


@Pipe({
  name: 'type',
  standalone: true
})
export class TypePipe implements PipeTransform {


    transform(bikes: Bike[], searchType: string, searchBrand: string, searchModel: string): Bike[] {
      if (!bikes) {
        return bikes;  // If no bikes, return the original array
      }
      
       // Trim the search terms and convert them to lowercase for case-insensitive comparison
    searchType = searchType ? searchType.trim().toLowerCase() : '';
    searchBrand = searchBrand ? searchBrand.trim().toLowerCase() : '';
    searchModel = searchModel ? searchModel.trim().toLowerCase() : '';

    
      // Filter the bikes array based on type, brand, and model
      return bikes.filter(bike => {
        const matchesType = bike.type.toLowerCase().includes(searchType);
        const matchesBrand = bike.brand.toLowerCase().includes(searchBrand);
        const matchesModel = bike.model.toLowerCase().includes(searchModel);
    
        // Return bike if it matches any of the search criteria
        return (
          matchesType && 
          matchesBrand && 
          matchesModel
        );
      });
    }
   
}



  // transform(value: Bike, ...args: string[]): any {
  //     const searchText = args[0];
    // // return value.filter((a:Bike) => a.type.toLowerCase());

    //    // Assuming 'type' is a property of Bike
    //    if (value.type.toLowerCase().includes(searchText)) {
    //     return value;
    //   }


    // transform(bikes: Bike[], searchText: string): Bike[] {
    //   if (!bikes || !searchText) {
    //     return bikes;  // If no searchText, return the original array
    //   }
      
    //   // Convert searchText to lowercase for case-insensitive comparison
    //   searchText = searchText.toLowerCase();
  
    //   // Filter the bikes array based on type
    //   return bikes.filter(bike => bike.type.toLowerCase().includes(searchText));
    // }