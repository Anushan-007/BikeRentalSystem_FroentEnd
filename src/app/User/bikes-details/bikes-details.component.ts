import { Component, Input, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { ToastrService } from 'ngx-toastr';
import { BikeTableService } from '../../Services/bike-table.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentalRequestService } from '../../Services/rental-request.service';
import { User } from '../../Models/users';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-bikes-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './bikes-details.component.html',
  styleUrl: './bikes-details.component.css'
})
export class BikesDetailsComponent implements OnInit {

  @Input() bikeData: any = '';

  bikeId: string | null = null;
  bikes:Bike[] =[];
  bike!:Bike;

  rentalRequestForm:FormGroup;

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private biketableService:BikeTableService , private toastr :ToastrService, private rentalRequestService:RentalRequestService){
    console.log(this.bikeData);
   this.bikeId = ( this.route.snapshot.paramMap.get("id"));
   
   console.log(this.bikeId);
   
    
   let getUser = (localStorage.getItem('user'))
   let user = { NicNumber: '' }
   if (getUser) {
     user = JSON.parse(getUser);
   } this.rentalRequestForm = this.fb.group({
    requestTime: [''],
     bikeId: [this.bikeId],
     nicNumber: [user.NicNumber]
   })
  }

  ngOnInit(): void {
    this.biketableService.getBikeById(this.bikeId).subscribe(data => {
      this.bike = data 
      console.log(data);
      
    })
  }


  getBikes(){
    this.biketableService.getAllBikes().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikes = data;
      },
      error: (err) => {
        this.toastr.error("Response Error" + err)
      }
  })
}

getBike(id: number) {
  this.biketableService.getBikeById(id).subscribe({
    next: (data) => {
      this.bike = data;
    },
    error: (err) => {
      console.error('Error fetching bike details:', err);
    }
  });
}


onRequest(){

 // this.rentalRequestForm.value.bikeId = this.bikeData.id;
  console.log(this.rentalRequestForm.value);
  this.rentalRequestService.postRequest(this.rentalRequestForm.value).subscribe(data => {
    console.log(data);
  }, error => {
    this.toastr.error(error.error);
  })

}


// onRequest() {
//   console.log(this.bikeData); // Check bikeData before proceeding
//   if (this.bikeData && this.bikeData.id) {
//     this.rentalRequestForm.value.bikeId = this.bikeData.id;
//   } else {
//     this.toastr.error('Bike ID is missing');
//     return; // Prevent form submission if bikeId is missing
//   }
//   console.log(this.rentalRequestForm.value); // Check form values before submission
//   this.rentalRequestService.postRequest(this.rentalRequestForm.value).subscribe(data => {
//     console.log(data);
//   }, error => {
//     this.toastr.error(error.error);
//   });
// }

}
