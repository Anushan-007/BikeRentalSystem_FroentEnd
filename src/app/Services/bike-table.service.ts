import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from '../Models/bike';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeTableService {

  constructor(private http:HttpClient, private router:Router) { }

  getBikeURL = "http://localhost:5268/api/Bike";
  getAllBikeURL = 'http://localhost:5268/api/Bike/GetAllBikes';
  postBikeURL = 'http://localhost:5268/api/Bike/BikeAdd';
  updateBikeURL = 'http://localhost:5268/api/Bike/';
  deleteBikeURL = 'http://localhost:5268/api/User/DeleteUser?NicNumber=';

  getAllBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.getAllBikeURL).pipe(
            catchError(this.handleError)
          );;
  }

  getBikeById(id:any):Observable<Bike>{
    return this.http.get<Bike>(this.getBikeURL+ "/"+id)
  }

  
  editBike(bike : Bike , BikeId : number ){
    return this.http.put(this.updateBikeURL + BikeId  , bike);
  }



  // postBikes(bikesArray: Bike): Observable<any> {
  //   return this.http.post(this.postBikeURL, bikesArray).pipe(
  //     catchError(this.handleError)
  //   );;;
  // }

  // postBikesWithImage(formData:FormData):Observable<any>{
  //   return this.http.post(this.postBikeURL , formData)
  // }

  // postBikesWithImage(formData: FormData): Observable<any> {
  //   return this.http.post(this.postBikeURL, formData);
  // }
  
  
  // In the bikeTableService (Angular service)

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








