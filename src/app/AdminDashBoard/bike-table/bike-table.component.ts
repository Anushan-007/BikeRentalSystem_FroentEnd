import { Component, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bike-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.css'
})
export class BikeTableComponent implements OnInit{

  bikeForm!:FormGroup;
  bikesArray:Bike[] = [];
  bikes!:Bike;
  selectedFile: File | null = null;

  constructor(private fb:FormBuilder, private bikeTableService:BikeTableService, private toastr: ToastrService, private router:Router){
    this.bikeForm = this.fb.group({
      id:[''],
      brand: ['', [Validators.required]],
      model: [''],
      type: [''],
      ratePerHour: ['', [Validators.required]],
      image : [null]
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  

  ngOnInit(): void {
    this.loadBikes();
  }


  loadBikes() {
    this.bikeTableService.getBikes().subscribe(data => {
      this.bikesArray = data;
      console.log(data);
    })
  }


  addBike() {
    if (this.bikeForm.invalid || !this.selectedFile) {
      return;  // Don't submit if the form is invalid or no file is selected
    }
  
    const formData = new FormData();
  
    // Append form values to FormData (excluding the image, since it's handled separately)
    Object.keys(this.bikeForm.value).forEach(key => {
      if (key !== 'image') {
        formData.append(key, this.bikeForm.get(key)?.value);
      }
    });
  
    // Append the image file
    formData.append('image', this.selectedFile, this.selectedFile.name);
  
    // Call the service to send the form data to the backend
    this.bikeTableService.postBikes(formData).subscribe(
      (response: any) => {
        console.log(response);
        
        this.toastr.success('Successfully added', 'Success');
        this.router.navigate(['/admin/bikeTable']);
        this.bikeForm.reset();
      },
      (error: any) => {
        this.toastr.error('Post Failed', error);
      }
    );
  }
  

  
}




  // addBike(){
  //   this.bikes = (this.bikeForm.value);
  //   const BikeForm = this.bikeForm.value;
  //   this.bikeForm.value.ratePerHour = parseInt(this.bikeForm.value.ratePerHour)
  //   this.bikeTableService.postBikes(this.bikes).subscribe(data => {
  //     this.toastr.success("successfully added", "Success")
  //     this.router.navigate(['/admin/bikeTable']);
  //     this.bikeForm.reset()
  //   })
  // }

