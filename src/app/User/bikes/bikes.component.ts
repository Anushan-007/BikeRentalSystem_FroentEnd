import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BikesDetailsComponent } from "../bikes-details/bikes-details.component";
import { FilterService } from '../../Services/filter.service';

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [RouterLink, CommonModule, BikesDetailsComponent],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class BikesComponent {

selected:any;
  bikesArray:Bike[] = [];
  currentBike!: Bike;
  bikeTypes: string[] = []; // To store the bike types
  selectedType: string = ''; // To bind the selected type in the dropdo
  dropdownOpen: boolean = false; // To toggle dropdown visibility

  constructor(private biketableService:BikeTableService , private toastr :ToastrService, private filterService:FilterService){

  }

  ngOnInit(): void {
    this.getBikes();
    this.getBikeTypes();
  }

  


  getBikes(){
    this.biketableService.getAllBikes().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikesArray = data;
      },
      error: (err) => {
        this.toastr.error("Response Error" + err)
      }
  })
}


getBike(id: any) {
  this.biketableService.getBikeById(id).subscribe(data => {
    this.currentBike = data;
    console.log(this.currentBike);
    // let imgCount = this.currentBike.bikeUnits.images?.length;
    // console.log(imgCount);
    // this.changeImage(this.currentBike)
  });

}

// Method to get all bike types
getBikeTypes(): void {
  this.filterService.getAllBikeTypes().subscribe(
    (data) => {
      this.bikeTypes = data; // Store the fetched bike types
    },
    (error) => {
      this.toastr.error(error.error)
    }
  );
}

  // Method to toggle the visibility of the dropdown
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Method to set the selected bike type
  selectType(type: string): void {
    this.selectedType = type;
    this.dropdownOpen = false; // Close dropdown after selection
  }

}
