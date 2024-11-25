import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BikesDetailsComponent } from "../bikes-details/bikes-details.component";

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, BikesDetailsComponent],
  templateUrl: './bikes.component.html',
  styleUrl: './bikes.component.css'
})
export class BikesComponent {


  bikesArray:Bike[] = [];
  currentBike!: Bike;

  constructor(private biketableService:BikeTableService , private toastr :ToastrService){

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

}
