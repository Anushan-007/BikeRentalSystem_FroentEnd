import { Component, OnInit } from '@angular/core';
import { rentalRequest } from '../../Models/rentalRequest';
import { CommonModule } from '@angular/common';
import { RentalRequestService } from '../../Services/rental-request.service';

@Component({
  selector: 'app-rental-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-request-list.component.html',
  styleUrl: './rental-request-list.component.css'
})
export class RentalRequestListComponent implements OnInit {

  rentalReq:rentalRequest[] =[];

  constructor(private rentalrequestService:RentalRequestService){}

  ngOnInit(): void {
    this.rentalrequestService.getRequests().subscribe(data => {
      this.rentalReq = data;
      console.log(data);
     })
  }


  acceptRequest(id : string){
    this.rentalrequestService.acceptRequest(id).subscribe(data => {
      console.log(data);
    })
   }
   
   declineRequest(id : string){
    this.rentalrequestService.declineRequest(id).subscribe(data => {
      console.log(data);
    })
   }


}
