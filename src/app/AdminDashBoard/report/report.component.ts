import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RentalRecordService } from '../../Services/rental-record.service';
import { RentalRequestService } from '../../Services/rental-request.service';
import { BikeUnitService } from '../../Services/bike-unit.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  totalPayment!: number ; 
  popularCustomer!:string;
  accepedRequest!:number;
  declinedRequest!:number;
  unavailableBikes!:number;

  constructor(private rentalRecordService:RentalRecordService, private requestService:RentalRequestService, private bikeUnitService:BikeUnitService){

  }
  ngOnInit(): void {
    this.countTotalPayment();
    this.PopularCustomer();
    this.getTotalAcceptedRentalRequest();
    this.getTotalDeclinedRentalRequest();
    this.unavailableBikeCount();
  }

  
  countTotalPayment(): void {
    this.rentalRecordService.getTotalPayment().subscribe(
      (data) => {
        console.log("Fetched Payment: ", data);  
        this.totalPayment = data;  
        console.log("Total Payment Count: ", this.totalPayment);  
      },
      error => {
        console.error('Error fetching total Payment', error);
      }
    );
  }

  PopularCustomer(): void {
    this.requestService.getPopularCustomer().subscribe(
      (data) => {
        console.log("Fetched Customer: ", data);  
        this.popularCustomer = data;  
        console.log("Total popular Customer: ", this.popularCustomer);  
      },
      error => {
        console.error('Error fetching popular Customer', error);
      }
    );
  }

  getTotalAcceptedRentalRequest(): void {
    this.requestService.getTotalAcceptedRentalRequest().subscribe(
      (data) => {
        console.log("Fetched Customer: ", data);  
        this.accepedRequest = data;  
        console.log("Total popular Customer: ", this.accepedRequest);  
      },
      error => {
        console.error('Error fetching popular Customer', error);
      }
    );
  }

  getTotalDeclinedRentalRequest(): void {
    this.requestService.getTotalDeclinedRentalRequest().subscribe(
      (data) => {
        console.log("Fetched Customer: ", data);  
        this.declinedRequest = data;  
        console.log("Total popular Customer: ", this.declinedRequest);  
      },
      error => {
        console.error('Error fetching popular Customer', error);
      }
    );
  }

  
  unavailableBikeCount(): void {
    this.bikeUnitService.unavailableBikeCount().subscribe(
      (data) => {
        console.log("Fetched Customer: ", data);  
        this.unavailableBikes = data;  
        console.log("Total popular Customer: ", this.unavailableBikes);  
      },
      error => {
        console.error('Error fetching popular Customer', error);
      }
    );
  }

}
