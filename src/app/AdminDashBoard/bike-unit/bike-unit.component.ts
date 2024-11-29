import { Component, OnInit } from '@angular/core';
import { bikeUnits } from '../../Models/bikeUnit';
import { CommonModule } from '@angular/common';
import { UnitsService } from '../../Services/units.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bike-unit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bike-unit.component.html',
  styleUrl: './bike-unit.component.css'
})
export class BikeUnitComponent implements OnInit {

  bikeunits:bikeUnits[] =[];

  constructor(private unitService:UnitsService, private toastr:ToastrService){}


  ngOnInit(): void {
    this.getBikeUnit();
  }


  getBikeUnit(){
    this.unitService.getBikeUnits().subscribe({
      next: (data) => {
        console.log(data);
        
        this.bikeunits = data;
      },
      error: (err) => {
        this.toastr.error(err.error)
      }
  })
}


deleteBikeUnit(regNo:string): void {
  console.log(regNo);
  
    this.unitService.deleteBikeUnit(regNo).subscribe(data => {
      console.log(data);
      
      this.toastr.success("Successfully Deleted", "Success")
    })
  }

}
