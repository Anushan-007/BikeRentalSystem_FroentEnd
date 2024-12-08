import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:5268/api/Bike/types'; 

   // Method to get all bike types
   getAllBikeTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
