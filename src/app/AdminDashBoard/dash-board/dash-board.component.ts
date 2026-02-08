import { Component } from '@angular/core';
import { BikeTableComponent } from '../bike-table/bike-table.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TotalbikesService } from '../../Services/totalbikes.service';
import { Bike } from '../../Models/bike';
import { RentalRequestService } from '../../Services/rental-request.service';
import { AdminService, DashboardData } from '../../Services/admin.service';

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
  AvaliableBikes!: number ; // Store outdoor bikes count (optional)
  
  // Admin Dashboard Data
  dashboardData?: DashboardData;
  totalUsers: number = 0;
  blockedUsers: number = 0;
  adminUsers: number = 0;
  managerUsers: number = 0;
  regularUsers: number = 0;

  constructor(
    private router:Router, 
    private totalBikeCount:TotalbikesService, 
    private rentalrequestService:RentalRequestService,
    private adminService: AdminService
  ){
    this.countTotalBikes();
    this.countTotalPendingRequest();
    this.getAvailableBikes();
    this.loadAdminDashboard();
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

  getAvailableBikes(): void {
    this.totalBikeCount.getAvailableBikes().subscribe(
      (data) => {
        console.log("Fetched req: ", data);  
        this.AvaliableBikes = data;  
        console.log("Total req Count: ", this.AvaliableBikes);  
      },
      error => {
        console.error('Error fetching total req', error);
      }
    );
  }

  /**
   * Load Admin Dashboard metrics from AdminController
   * Gets user statistics, role distribution, and recent users
   */
  loadAdminDashboard(): void {
    this.adminService.getDashboard().subscribe({
      next: (data) => {
        console.log("Admin Dashboard Data: ", data);
        this.dashboardData = data;
        this.totalUsers = data.totalUsers;
        this.blockedUsers = data.blockedUsers;
        this.adminUsers = data.adminUsers;
        this.managerUsers = data.managerUsers;
        this.regularUsers = data.regularUsers;
      },
      error: (error) => {
        console.error('Error fetching admin dashboard', error);
      }
    });
  }

}
