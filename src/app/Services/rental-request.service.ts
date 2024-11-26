import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRequest } from '../Models/rentalRequest';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http:HttpClient) { }

  rentalRequestPostURL = 'http://localhost:5268/api/RentalRequest';
  rentalRequestGetAllURL = 'http://localhost:5268/api/RentalRequest'
  acceptRequestURl = 'http://localhost:5268/api/RentalRequest/Accept-Request'
  declineRequestURL = 'http://localhost:5268/api/RentalRequest/Decline-Request'
  getRequestforportalURL = 'http://localhost:5268/api/RentalRequest?status=1';

  postRequest(req: any) {
    return this.http.post<rentalRequest>(this.rentalRequestPostURL, req);
  }


  getRequests() {
    return this.http.get<rentalRequest[]>(this.rentalRequestGetAllURL);
  }

  getRequestsForPortal() {
    return this.http.get<rentalRequest[]>(this.getRequestforportalURL);
  }

  acceptRequest(id: string) {
    return this.http.get(this.acceptRequestURl + id);
  }
  declineRequest(id: string) {
    return this.http.get(this.declineRequestURL + id);
  }
  
}
