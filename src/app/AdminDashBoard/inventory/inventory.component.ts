import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bike } from '../../Models/bike';
import { InventoryService } from '../../Services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { bikeUnits } from '../../Models/bikeUnit';
import { images } from '../../Models/images';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {

  bikesArray:Bike[] =[];
  bikeUnits !: bikeUnits;
  images!:images

  constructor(private inventory:InventoryService, private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.inventory.AllBikes().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikesArray = data;
      },
      error: (err) => {
        this.toastr.error(err.error.error)
      }
  })
  }

 

}
