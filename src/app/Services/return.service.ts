import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http:HttpClient) { }

  paymentCalculateURL = 'http://localhost:5268/api/RentalRecord/get-payment';

  CalculateRentPayment( id: rentalRecord){
    return this.http.get<any>(this.paymentCalculateURL+ id);
  }

}
