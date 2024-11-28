import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http:HttpClient) { }

  getRentRecordURL = 'http://localhost:5268/api/RentalRecord?state=1';

  postRentalRecord(record : rentalRecord){
    return this.http.post("http://localhost:5268/api/RentalRecord" , record);
  }


  rentalRecord(){
    return this.http.get<rentalRecord[]>(this.getRentRecordURL);
  }

}
