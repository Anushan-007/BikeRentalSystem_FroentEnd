import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';
import { User } from '../../Models/users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  users!:User[];
  user!:User
  userName:string = '';
  nic:string = '';
  fName :string = '';
  lName :string = '';
  email:string = '';
  cNumber:string = '';
  address:string = '';
  accountCreated :string = '';

  editId!:string;

  
  


  constructor(private router:Router, private customerService:CustomerService, private toastr:ToastrService){

  }

  ngOnInit(): void {
    const name = localStorage.getItem("name") || "";
    const NicNumber = localStorage.getItem("nicNumber") || "";
    const FirstName = localStorage.getItem("FirstName") || "";
    const LastName = localStorage.getItem("LastName") || "";
    const Email = localStorage.getItem("Email" ) || "";
    const ContactNo = localStorage.getItem("ContactNo" ) || "";
    const cNumber = localStorage.getItem("cNumber" ) || "";
    const Address = localStorage.getItem("Address" ) || "";
    const AccountCreated = localStorage.getItem("AccountCreated" ) || "";



    this.userName = name;
    this.nic = NicNumber;
    this.fName = FirstName;
    this.lName = LastName;
    this.email = Email;
    this.cNumber = ContactNo;
    this.address = Address;
    this.accountCreated = AccountCreated;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }


  getBikeById(nic:string){
    this.customerService.getBikeById(nic).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (err) => {
        this.toastr.error(err.error.error)
      }
    })

  }

  updateUser(nic:string, user:User){
    this.customerService.UpdateUsers(nic,user).subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (err) => {
        this.toastr.error(err.error.error)
      }
    })

  }
  


}
