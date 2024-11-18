import { Component, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { BikeTableService } from '../../Services/bike-table.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bike-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bike-table.component.html',
  styleUrl: './bike-table.component.css'
})
export class BikeTableComponent implements OnInit{

  constructor(private bikeTableService:BikeTableService, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.loadBikes();
  }

  bikes:Bike[] = [];


  
  loadBikes() {
    this.bikeTableService.getBikes().subscribe(data => {
      this.bikes = data;
      console.log(data);
    })
  }


}
