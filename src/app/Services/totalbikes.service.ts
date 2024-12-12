import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TotalbikesService {

  constructor(private http:HttpClient) { }

private getTotalBikeURL = 'http://localhost:5268/api/BikeUnit/totalBikes';
private avaliblebikesCount = 'http://localhost:5268/api/BikeUnit/available/count';
  
  getTotalBikes(): Observable<number> {
    return this.http.get<number>(this.getTotalBikeURL)
  }

  getAvailableBikes(): Observable<number> {
    return this.http.get<number>(this.avaliblebikesCount)
  }

}
