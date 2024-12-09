import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { rentalRequest } from '../../Models/rentalRequest';
import { RentalRequestService } from '../../Services/rental-request.service';
import { rentalRecord } from '../../Models/rentalRecord';
import { RentalRecordService } from '../../Services/rental-record.service';
import { ReturnService } from '../../Services/return.service';
import { payment } from '../../Models/payment';
import { RentalRecordRequest } from '../../Models/RentalRecRequest';
import { RentalRecordPipe } from '../../Pipe/rental-record.pipe';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RentalRecordPipe],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit {

  rentalRec:rentalRecord[] =[];
  currentRecord!:rentalRecord;
  searchText:string = '';
  
  pay!:payment;
  selected: any;
  currentTime!: Date;

  recRequest: RentalRecordRequest = {
    id: '',
    payment: 0
  };

  constructor(private rentalrecordService:RentalRecordService, private returnService:ReturnService){
    this.currentTime = new Date();
  }




  ngOnInit(): void {
    this.rentalrecordService.rentalRecord().subscribe(data => {
      this.rentalRec = data;
      console.log(data);
     })
  }

  displayPayment(recordId: any) {
    console.log(recordId);
    this.rentalrecordService.getRentalRecord(recordId).subscribe(data => {
      console.log('Fetched Rental Record:', data);
      this.currentRecord = data;
      this.returnService.CalculateRentPayment(recordId).subscribe(data => {
        console.log(data);
        this.pay = data;
      })
    })
   
  }


  
  // completeRecord(rec:RentalRecordRequest) {
  //   console.log(rec);
  //   this.rentalrecordService.getRentalRecord(rec.id).subscribe(data => {
  //     console.log(data);
  //     this.currentRecord = data;
  //     this.recRequest.payment = rec.payment;
  //     console.log(this.currentRecord);
  //     this.returnService.completeRentalRecord(rec.id, this.currentRecord).subscribe(data => {
  //       console.log(data);
  //     })
  //   })
  // }
  

  // Update completeRecord to handle payment
  // completeRecord(item: rentalRecord): void {
  //   // Prepare the rental record request with the current item details
  //   this.recRequest.id = item.id;
  //   this.recRequest.payment = this.pay ? this.pay.payment : 0; // Ensure payment is defined

  //   console.log(this.recRequest); // Log the request for debugging

  //   // First, fetch the rental record details
  //   this.rentalrecordService.getRentalRecord(this.recRequest.id).subscribe(data => {
  //     console.log('Fetched Rental Record:', data);
  //     this.currentRecord = data;

  //     // Now, complete the rental record by passing the request to the service
  //     this.returnService.completeRentalRecord(this.recRequest.id, this.currentRecord).subscribe(response => {
  //       console.log('Rental Record Completed:', response);
  //     }, error => {
  //       console.error('Error completing rental record:', error);
  //     });
  //   });
  // }


  // Update completeRecord to handle payment
  completeRecord(item: rentalRecord): void {
    // Check if payment is available before proceeding
    if (!this.pay || this.pay.payment === undefined || this.pay.payment <= 0) {
      console.error('Payment data is missing or invalid.');
      return;
    }

    // Prepare the rental record request with the current item details
    this.recRequest.id = item.id;
    this.recRequest.payment = this.pay.payment;  // Ensure payment is properly included

    console.log('Rental Record Request:', this.recRequest); // Log for debugging

    // Fetch the rental record details
    this.rentalrecordService.getRentalRecord(this.recRequest.id).subscribe(data => {
      console.log('Fetched Rental Record:', data);
      this.currentRecord = data;

      // Now, complete the rental record by passing the request to the service
      this.returnService.completeRentalRecord(this.recRequest.id, this.recRequest).subscribe(response => {
        console.log('Rental Record Completed:', response);
      }, error => {
        console.error('Error completing rental record:', error);
      });
    });
  }


}
