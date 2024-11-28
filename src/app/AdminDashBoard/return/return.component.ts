import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { rentalRequest } from '../../Models/rentalRequest';
import { RentalRequestService } from '../../Services/rental-request.service';
import { rentalRecord } from '../../Models/rentalRecord';
import { RentalRecordService } from '../../Services/rental-record.service';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent implements OnInit {

  rentalRec:rentalRecord[] =[];

  constructor(private rentalrecordService:RentalRecordService){}

  ngOnInit(): void {
    this.rentalrecordService.rentalRecord().subscribe(data => {
      this.rentalRec = data;
      console.log(data);
     })
  }

  

  
}
