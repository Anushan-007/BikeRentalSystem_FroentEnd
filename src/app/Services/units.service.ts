import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bikeUnits } from '../Models/bikeUnit';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private http:HttpClient) { }

  getBikeUnitsavailable = 'http://localhost:5268/api/BikeUnit/availablityUnits?availability=true';
  deleteBikeUnitURL = 'http://localhost:5268/api/BikeUnit?regNo='

  getBikeUnits(){
    return this.http.get<bikeUnits[]>(this.getBikeUnitsavailable)
  }

  deleteBikeUnit(registrationNumber:string){
    return this.http.delete(this.deleteBikeUnitURL  + registrationNumber)
  }

}
