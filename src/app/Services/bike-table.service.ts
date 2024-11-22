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


  getAllBikeURL = 'http://localhost:5268/api/Bike/GetAllBikes';
  postBikeURL = 'http://localhost:5268/api/Bike/BikeAdd';
  AllBikesPaginationURL = 'http://localhost:5268/api/Bike';


  getAllBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.AllBikesPaginationURL).pipe(
            catchError(this.handleError)
          );;
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




  postBikes(bikesArray: Bike): Observable<any> {
    return this.http.post(this.postBikeURL, bikesArray).pipe(
      catchError(this.handleError)
    );;;
  }
  

}








