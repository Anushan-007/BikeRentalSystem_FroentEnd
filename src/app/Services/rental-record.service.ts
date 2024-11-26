import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalRecordService {

  constructor(private http:HttpClient) { }

  postRentalRecord(record : any){
    return this.http.post("http://localhost:5268/api/RentalRecord" , record);
  }
}
