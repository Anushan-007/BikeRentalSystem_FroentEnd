import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { AdminService } from '../../Services/admin.service';
import { User } from '../../Models/users';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomerNicPipe } from '../../Pipe/customer-nic.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule,CustomerNicPipe, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  User:User[] = [];
  searchText:string = '';
  roleOptions = ['Admin', 'Manager', 'User'];
  
  constructor(
    private customerService:CustomerService, 
    private adminService: AdminService,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.getAllUser();
  }


  getAllUser(){

    this.customerService.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        
        this.User = data;
        // this.loading = false;
      },
      error: (err) => {
        // this.error = 'Failed to load bikes';
        // this.loading = false;
        this.toastr.error("Response Error"+err);
      }
  })
  }


  // toggleBlock(user: any): void {
  //   // Toggle the block state
  //   user.isBlocked = !user.isBlocked;

  //   // If you need to save this state, you can call an API or save it in local storage
  //   console.log(`${user.userName} is now ${user.isBlocked ? 'Blocked' : 'Unblocked'}`);
  // }

  blockedUser(nicNumber:string){
    this.customerService.blockedUser(nicNumber).subscribe(
      (data) => {
        console.log("Fetched Customer: ", data);  
      //  if(data == true){
      //   this.toastr.warning("Blocked User");
      //  }else if(data == false){
      //   this.toastr.warning("UnBlocked User");
      //  } 
      },
      error => {
        this.toastr.error("Failed Blocked")
      }
    );
  }

  /**
   * Change user role using AdminController
   * Integrated with AdminService for role management
   */
  changeRole(user: User, newRole: string): void {
    if (confirm(`Change ${user.firstName} ${user.lastName}'s role to ${newRole}?`)) {
      this.adminService.changeUserRole(user.nicNumber, newRole).subscribe({
        next: (response) => {
          console.log('Role changed:', response);
          this.toastr.success(`Role changed to ${newRole}`, 'Success');
          user.roles = newRole as any; // Update local data
        },
        error: (error) => {
          console.error('Error changing role:', error);
          this.toastr.error('Failed to change role', 'Error');
        }
      });
    }
  }

  /**
   * Search users using AdminController search endpoint
   */
  searchUsers(): void {
    if (this.searchText.trim() === '') {
      this.getAllUser();
      return;
    }
    
    this.adminService.searchUsers(this.searchText).subscribe({
      next: (data) => {
        console.log('Search results:', data);
        this.User = data;
      },
      error: (error) => {
        console.error('Error searching users:', error);
        this.toastr.error('Failed to search users', 'Error');
      }
    });
  }

}
