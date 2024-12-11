import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Bike } from '../Models/bike';
import { User } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private router:Router) { }

  getAllUser = 'http://localhost:5268/api/User/GetAllUsers';
  UpdateUserURL = 'http://localhost:5268/api/User/UpdateUser?NicNumber=';
  getUserURL = 'http://localhost:5268/api/User/GetUserById?NicNumber=';
  blockedUserURL = 'http://localhost:5268/api/User/blockUser?NicNumber=';

  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUser).pipe(
            catchError(this.handleError)
          );;
  }

// Service: Change Observable<User> to Observable<user> (lowercase)
getUserById(NicNumber: string): Observable<User> {
  return this.http.get<User>(this.getUserURL + NicNumber);
}


  UpdateUsers(NicNumber:string, user:User): Observable<User[]> {
    return this.http.put<User[]>(this.UpdateUserURL + NicNumber , user).pipe(
            catchError(this.handleError)
          );;
  }

  blockedUser(NicNumber:string):Observable<boolean>{
    return this.http.put<boolean>(this.blockedUserURL + NicNumber , {})
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
