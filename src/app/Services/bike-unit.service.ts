import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bikeUnits } from '../Models/bikeUnit';

@Injectable({
  providedIn: 'root'
})
export class BikeUnitService {

  constructor(private http:HttpClient) { }


  getAvailableUnitsByBikeId(bikeId: string) {
    return this.http.get<bikeUnits[]>("http://localhost:5268/api/BikeUnit?availability=true&bikeId=" + bikeId);
  }

  

}
