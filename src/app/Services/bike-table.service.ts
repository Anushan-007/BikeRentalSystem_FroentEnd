import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from '../Models/bike';
import { Observable, catchError, throwError } from 'rxjs';
import { updateBike } from '../Models/updateBike';
import { bikeUnitUpdateDTO } from '../Models/BikeUnitUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class BikeTableService {

  constructor(private http:HttpClient, private router:Router) { }

   baseUrl = 'http://localhost:5268/api/Bike';
  getBikeURL = "http://localhost:5268/api/Bike";
  getAllBikeURL = 'http://localhost:5268/api/Bike/GetAllBikes';
  postBikeURL = 'http://localhost:5268/api/Bike/BikeAdd';
  updateBikeURL = 'http://localhost:5268/api/Bike/';
  deleteBikeURL = 'http://localhost:5268/api/Bike/DeleteBike?Id=';

  getAllBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.getAllBikeURL).pipe(
            catchError(this.handleError)
          );;
  }

  getBikeById(id:any):Observable<Bike>{
    return this.http.get<Bike>(this.getBikeURL+ "/"+id)
  }

  
  // updateBike(bikeId: string, bike: bikeUnitUpdateDTO) {
  //   const url = `${this.updateBikeURL}${bikeId}`;  // Append the bikeId to the URL
  //   return this.http.put(url, bike);  // Make the PUT request to update the bike
  // }

    //Method to update the bike, bike unit, and images
    // updateBikeUnit(bikeId: string, bikeUnitUpdateDTO: bikeUnitUpdateDTO): Observable<any> {
    //   const formData = new FormData();
  
    //   // Check if required fields are populated before appending them to FormData
  
    //   if (!bikeUnitUpdateDTO.unitId) {
    //     throw new Error('UnitId is required.');
    //   }
    //   formData.append('UnitId', bikeUnitUpdateDTO.unitId);
  
    //   if (bikeUnitUpdateDTO.brand) {
    //     formData.append('Brand', bikeUnitUpdateDTO.brand);
    //   }
  
    //   if (bikeUnitUpdateDTO.type) {
    //     formData.append('Type', bikeUnitUpdateDTO.type);
    //   }
  
    //   if (bikeUnitUpdateDTO.model) {
    //     formData.append('Model', bikeUnitUpdateDTO.model);
    //   }
  
    //   // RentPerHour should be a valid number, so check for it
    //   if (bikeUnitUpdateDTO.rentPerHour || bikeUnitUpdateDTO.rentPerHour === 0) {
    //     formData.append('RentPerHour', bikeUnitUpdateDTO.rentPerHour.toString());
    //   }
  
    //   // Check if RegistrationNumber is provided and valid (required field)
    //   if (!bikeUnitUpdateDTO.registrationNumber || bikeUnitUpdateDTO.registrationNumber.trim() === '') {
    //     throw new Error('RegistrationNumber is required.');
    //   }
    //   formData.append('RegistrationNumber', bikeUnitUpdateDTO.registrationNumber);
  
    //   // Handle Year field, check if it's a valid number
    //   if (bikeUnitUpdateDTO.year) {
    //     formData.append('Year', bikeUnitUpdateDTO.year.toString());
    //   }
  
    //   // Ensure Availability is a boolean and append it
    //   if (typeof bikeUnitUpdateDTO.availability === 'boolean') {
    //     formData.append('Availability', bikeUnitUpdateDTO.availability.toString());
    //   } else {
    //     throw new Error('Availability is required.');
    //   }
  
    //   // Handle images (if available)
    //   if (bikeUnitUpdateDTO.bikeImages && bikeUnitUpdateDTO.bikeImages.length > 0) {
    //     for (let i = 0; i < bikeUnitUpdateDTO.bikeImages.length; i++) {
    //       formData.append('BikeImages', bikeUnitUpdateDTO.bikeImages[i], bikeUnitUpdateDTO.bikeImages[i].name);
    //     }
    //   }
  
    //   // Send the PUT request
    //   return this.http.put(`${this.baseUrl}/${bikeId}/UpdateBike`, formData);
    // }

    updateBikeUnit( bikeId : string, formData:FormData){
      
    return this.http.put("http://localhost:5268/api/Bike/" + bikeId +"/Updatebike",formData);
  }
  

postBikeData(bikeData: Bike): Observable<any> {
  return this.http.post('http://localhost:5268/api/Bike/BikeAdd', bikeData);
}

postBikeImages(imageData: FormData): Observable<any> {
  console.log(imageData);
  
  return this.http.post('http://localhost:5268/api/Bike/AddBikeImages', imageData);
}



DeleteBike(id:string){
  return this.http.delete(this.deleteBikeURL+ id)
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Error: ${error.status}, Message: ${error.message}`;
  }
  return throwError(errorMessage);
}


}








