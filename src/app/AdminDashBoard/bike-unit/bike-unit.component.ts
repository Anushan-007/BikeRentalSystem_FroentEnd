import { Component, OnInit, TemplateRef } from '@angular/core';
import { bikeUnits } from '../../Models/bikeUnit';
import { CommonModule } from '@angular/common';
import { UnitsService } from '../../Services/units.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bike-unit',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService],
  templateUrl: './bike-unit.component.html',
  styleUrl: './bike-unit.component.css'
})
export class BikeUnitComponent implements OnInit {

  bikeunits:bikeUnits[] =[];

  modalRef?: BsModalRef;
  message?: string;
  regNo!:string;

  constructor(private unitService:UnitsService, private toastr:ToastrService, private modalService: BsModalService ){}


  ngOnInit(): void {
    this.getBikeUnit();
  }


  getBikeUnit(){
    this.unitService.getBikeUnits().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikeunits = data;
      },
      error: (err) => {
        this.toastr.error(err.error)
      }
  })
}


deleteBikeUnit(regNo:string): void {
  console.log(regNo);
  
    this.unitService.deleteBikeUnit(regNo).subscribe(data => {
      console.log(data);
      
      this.toastr.success("Successfully Deleted", "Success")
    })
  }

  openModal(template: TemplateRef<void>, registrationNumber:string) {
    this.regNo = registrationNumber;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.deleteBikeUnit(this.regNo)
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}


