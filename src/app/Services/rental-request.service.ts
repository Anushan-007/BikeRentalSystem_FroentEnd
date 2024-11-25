import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRequest } from '../Models/rentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http:HttpClient) { }

  rentalRequestPostURL = 'http://localhost:5268/api/RentalRequest';
  rentalRequestGetAllURL = 'http://localhost:5268/api/RentalRequest'

  postRequest(req: any) {
    return this.http.post<rentalRequest>(this.rentalRequestPostURL, req);
  }


  getRequests() {
    return this.http.get<rentalRequest[]>(this.rentalRequestGetAllURL);
  }

  
}
