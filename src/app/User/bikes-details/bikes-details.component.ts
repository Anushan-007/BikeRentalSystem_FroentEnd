import { Component, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { ToastrService } from 'ngx-toastr';
import { BikeTableService } from '../../Services/bike-table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bikes-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bikes-details.component.html',
  styleUrl: './bikes-details.component.css'
})
export class BikesDetailsComponent implements OnInit {

  bikes:Bike[] =[];

  constructor(private biketableService:BikeTableService , private toastr :ToastrService){

  }

  ngOnInit(): void {
    this.getBikes();
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

}
