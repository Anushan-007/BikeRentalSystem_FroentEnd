import { Component, OnInit, TemplateRef } from '@angular/core';
import { rentalRequest } from '../../Models/rentalRequest';
import { CommonModule } from '@angular/common';
import { RentalRequestService } from '../../Services/rental-request.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { RentalRequestPipe } from '../../Pipe/rental-request.pipe';

@Component({
  selector: 'app-rental-request-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RentalRequestPipe],
  providers : [BsModalService],
  templateUrl: './rental-request-list.component.html',
  styleUrl: './rental-request-list.component.css'
})
export class RentalRequestListComponent implements OnInit {

  rentalReq:rentalRequest[] =[];
  modalRef?: BsModalRef;
  message?: string;
  id!:string;
  searchText:string = '';

  constructor(private rentalrequestService:RentalRequestService, private modalService: BsModalService){}

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

   openModal(template: TemplateRef<void>, id:string) {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.declineRequest(this.id)
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}
