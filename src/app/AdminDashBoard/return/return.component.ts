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

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit {

  rentalRec:rentalRecord[] =[];
  
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
    this.returnService.CalculateRentPayment(recordId).subscribe(data => {
      console.log(data);
      this.pay = data;
    })
  }

  
}
