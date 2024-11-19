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

  constructor(private fb:FormBuilder, private bikeTableService:BikeTableService, private toastr: ToastrService, private router:Router){
    this.bikeForm = this.fb.group({
      id:[''],
      brand: ['', [Validators.required]],
      model: [''],
      type: [''],
      ratePerHour: ['', [Validators.required]]
    })
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


  addBike(){
    this.bikes = (this.bikeForm.value);
    const BikeForm = this.bikeForm.value;
    this.bikeForm.value.ratePerHour = parseInt(this.bikeForm.value.ratePerHour)
    this.bikeTableService.postBikes(this.bikes).subscribe(data => {
      this.toastr.success("successfully added", "Success")
      this.router.navigate(['/admin/bikeTable']);
      this.bikeForm.reset()
    })
  }

}
