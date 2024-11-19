import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from '../Models/bike';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeTableService {

  constructor(private http:HttpClient, private router:Router) { }


  getAllBikeURL = 'http://localhost:5268/api/Bike/GetAllBikes';
  postBikeURL = 'http://localhost:5268/api/Bike/BikeAdd';
  
  getBikes() {
    console.log(this.http.get<Bike[]>(this.getAllBikeURL));
    return this.http.get<Bike[]>(this.getAllBikeURL);
    
  }


  postBikes(formData: FormData): Observable<any> {
    return this.http.post(this.postBikeURL, formData);
  }
  

}








