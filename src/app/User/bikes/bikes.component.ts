import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BikesDetailsComponent } from "../bikes-details/bikes-details.component";
import { FilterService } from '../../Services/filter.service';
import { TypePipe } from '../../Pipe/type.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [ CommonModule, BikesDetailsComponent,TypePipe, FormsModule],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class BikesComponent {

selected:any;
  bikesArray:Bike[] = [];
  searchText:string = '';
  searchType:string = '';
  searchBrand: string = '';
  searchModel: string = '';
  



  currentBike!: Bike;
  // bikeTypes: string[] = []; 
  // selectedType: string = ''; 
  // dropdownOpen: boolean = false; 

 

  constructor(private biketableService:BikeTableService , private toastr :ToastrService, private filterService:FilterService){

  }

  ngOnInit(): void {
    this.getBikes();
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
// getBikeTypes(): void {
//   this.filterService.getAllBikeTypes().subscribe(
//     (data) => {
//       this.bikeTypes = data; 
//     },
//     (error) => {
//       this.toastr.error(error.error)
//     }
//   );
// }

  // Method to toggle the visibility of the dropdown
  // toggleDropdown(): void {
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  // Method to set the selected bike type
  // selectType(type: string): void {
  //   this.selectedType = type;
  //   this.dropdownOpen = false; 
  // }

}
