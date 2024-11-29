import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http:HttpClient) { }

  paymentCalculateURL = 'http://localhost:5268/api/RentalRecord/get-payment';
  completerentalRecord = 'http://localhost:5268/api/RentalRecord/complete-record?id=';

  CalculateRentPayment( id: rentalRecord){
    return this.http.get<any>(this.paymentCalculateURL+ id);
  }

  completeRentalRecord(id : string , req : any){
    return this.http.put<rentalRecord>(this.completerentalRecord + id , req);
  }

}
