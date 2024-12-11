import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bikeUnits } from '../Models/bikeUnit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikeUnitService {

  constructor(private http:HttpClient) { }

   unavailableBikeCountURL = 'http://localhost:5268/api/BikeUnit/count-unavailable';


  getAvailableUnitsByBikeId(bikeId: string) {
    return this.http.get<bikeUnits[]>("http://localhost:5268/api/BikeUnit?availability=true&bikeId=" + bikeId);
  }

  unavailableBikeCount(): Observable<number> {
    return this.http.get<number>(this.unavailableBikeCountURL)
  }
  

}
