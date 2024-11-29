import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Bike } from '../Models/bike';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http:HttpClient) { }

  AllBikesURL = 'http://localhost:5268/api/Bike/AllBikes';

  
  AllBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.AllBikesURL)

}

}