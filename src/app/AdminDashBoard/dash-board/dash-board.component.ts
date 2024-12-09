import { Component } from '@angular/core';
import { BikeTableComponent } from '../bike-table/bike-table.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TotalbikesService } from '../../Services/totalbikes.service';
import { Bike } from '../../Models/bike';
import { RentalRequestService } from '../../Services/rental-request.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  totalBikes!: number ;  // To store total bike count
  pendingRequests!: number;  // Store pending requests count (optional)
  outdoorBikes!: number ; // Store outdoor bikes count (optional)

  constructor(private router:Router, private totalBikeCount:TotalbikesService, private rentalrequestService:RentalRequestService){
    this.countTotalBikes();
    this.countTotalPendingRequest();
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }


  countTotalBikes(): void {
    this.totalBikeCount.getTotalBikes().subscribe(
      (data) => {
        console.log("Fetched bikes: ", data);  
        this.totalBikes = data;  
        console.log("Total Bikes Count: ", this.totalBikes);  
      },
      error => {
        console.error('Error fetching total bikes', error);
      }
    );
  }

  countTotalPendingRequest(): void {
    this.rentalrequestService.getTotalRentalRequest().subscribe(
      (data) => {
        console.log("Fetched req: ", data);  
        this.pendingRequests = data;  
        console.log("Total req Count: ", this.pendingRequests);  
      },
      error => {
        console.error('Error fetching total req', error);
      }
    );
  }

}
