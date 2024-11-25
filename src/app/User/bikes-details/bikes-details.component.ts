import { Component, Input, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { ToastrService } from 'ngx-toastr';
import { BikeTableService } from '../../Services/bike-table.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bikes-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bikes-details.component.html',
  styleUrl: './bikes-details.component.css'
})
export class BikesDetailsComponent implements OnInit {

  @Input() bikeData: any = '';

  bikeId: string | null = null;
  bikes:Bike[] =[];
  bike!:Bike;

  constructor(private route: ActivatedRoute, private biketableService:BikeTableService , private toastr :ToastrService){
    console.log(this.bikeData);
   this.bikeId = ( this.route.snapshot.paramMap.get("id"));
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

}
