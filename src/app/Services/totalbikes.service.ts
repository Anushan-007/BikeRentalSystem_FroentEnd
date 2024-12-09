import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../Models/bike';

@Injectable({
  providedIn: 'root'
})
export class TotalbikesService {

  constructor(private http:HttpClient) { }

private getTotalBikeURL = 'http://localhost:5268/api/Bike/totalBikes';
  
  getTotalBikes(): Observable<number> {
    return this.http.get<number>(this.getTotalBikeURL)
  }

}
