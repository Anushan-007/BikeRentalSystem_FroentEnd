import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http:HttpClient) { }

  getRentRecordURL = 'http://localhost:5268/api/RentalRecord?state=1';
  getRetalRecordByIdURL = 'http://localhost:5268/api/RentalRecord/';
  getOverdueURL = 'http://localhost:5268/api/RentalRecord/Get-overdue';
  //http://localhost:5268/api/RentalRecord/87BF2B71-7241-41B5-C896-08DD10412DBD
  totalPaymentURL = 'http://localhost:5268/api/RentalRecord/total-payment';

  postRentalRecord(record : rentalRecord){
    return this.http.post("http://localhost:5268/api/RentalRecord" , record);
  }


  rentalRecord(){
    return this.http.get<rentalRecord[]>(this.getRentRecordURL);
  }

  getRentalRecord(id : string){
    return this.http.get<rentalRecord>(this.getRetalRecordByIdURL + id)
  }

  getOverDueRentals(nicNumber:string) {
    return this.http.get<rentalRecord[]>(this.getOverdueURL);
  }

  getTotalPayment(): Observable<number> {
    return this.http.get<number>(this.totalPaymentURL)
  }

}
