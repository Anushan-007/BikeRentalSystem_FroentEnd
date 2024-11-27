import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRecord } from '../Models/rentalRecord';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http:HttpClient) { }

  postRentalRecord(record : rentalRecord){
    return this.http.post("http://localhost:5268/api/RentalRecord" , record);
  }


}
