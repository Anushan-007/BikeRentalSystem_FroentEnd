import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { rentalRequest } from '../../Models/rentalRequest';
import { bikeUnits } from '../../Models/bikeUnit';
import { BikeUnitService } from '../../Services/bike-unit.service';
import { RentalRequestService } from '../../Services/rental-request.service';
import { RentalRecordService } from '../../Services/rental-record.service';

@Component({
  selector: 'app-rental-process',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './rental-process.component.html',
  styleUrl: './rental-process.component.css'
})
export class RentalProcessComponent implements OnInit {

  rentalReq:rentalRequest [] = [];
  rentalRecordForm:FormGroup;


  constructor(private fb: FormBuilder, private bikeUnitService:BikeUnitService , private rentalRequestService: RentalRequestService,
    private rentalRecordService: RentalRecordService){
      this.rentalRecordForm = this.fb.group({
        registrationNumber: [''],
        rentalRequestId : ['']
      })
  }

  
  ngOnInit(): void {
    this.rentalRequestService.getRequestsForPortal().subscribe(data => {
      console.log(data);
      this.rentalReq = data;
      // this.rentalReq.forEach(request => {
      //   this.getAvailableInventoryUnits(request.bikeId);
      // });

    })
  }
  units! : bikeUnits[];
  getAvailableInventoryUnits(bikeId: string) {
    this.bikeUnitService.getAvailableUnitsByBikeId(bikeId).subscribe(data => {
      this.units = data;
      console.log(data);
    })
  }

  rentOut(requestId: string) {
    console.log(this.rentalRecordForm.value);
    this.rentalRecordForm.value.rentalRequestId = requestId;
    this.rentalRecordService.postRentalRecord(this.rentalRecordForm.value).subscribe(data => {
      console.log(data);
    })
  }


}
