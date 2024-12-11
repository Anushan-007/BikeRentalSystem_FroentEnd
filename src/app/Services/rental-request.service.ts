import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rentalRequest } from '../Models/rentalRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {

  constructor(private http:HttpClient) { }

  rentalRequestPostURL = 'http://localhost:5268/api/RentalRequest';
  rentalRequestGetAllURL = 'http://localhost:5268/api/RentalRequest'
  acceptRequestURl = 'http://localhost:5268/api/RentalRequest/Accept-Request'
  declineRequestURL = 'http://localhost:5268/api/RentalRequest/Decline-Request'
  // getRequestforportalURL = 'http://localhost:5268/api/RentalRequest?status=1';
  getAcceptRentalURl = 'http://localhost:5268/api/RentalRequest?status=2';

  pendingRequestURL = 'http://localhost:5268/api/RentalRequest/pending-count';
  popularRequestURL = 'http://localhost:5268/api/RentalRequest/most-popular-nic';
  acceptedRequestCountURL = 'http://localhost:5268/api/RentalRequest/acceptedcount';
  declinedRequestCountURL = 'http://localhost:5268/api/RentalRequest/declinedcount';



  postRequest(req: any) {
    return this.http.post<rentalRequest>(this.rentalRequestPostURL, req);
  }


  getRequests() {
    return this.http.get<rentalRequest[]>(this.rentalRequestGetAllURL);
  }

  getRequestsForPortal() {
    return this.http.get<rentalRequest[]>(this.getAcceptRentalURl);
  }

  acceptRequest(id: string) {
    return this.http.get(this.acceptRequestURl + id);
  }
  declineRequest(id: string) {
    return this.http.get(this.declineRequestURL + id);
  }

  getTotalRentalRequest(): Observable<number> {
    return this.http.get<number>(this.pendingRequestURL)
  }

  getPopularCustomer(): Observable<string> {
    return this.http.get<string>(this.popularRequestURL)
  }

  getTotalAcceptedRentalRequest(): Observable<number> {
    return this.http.get<number>(this.acceptedRequestCountURL)
  }

  getTotalDeclinedRentalRequest(): Observable<number> {
    return this.http.get<number>(this.declinedRequestCountURL)
  }
}
