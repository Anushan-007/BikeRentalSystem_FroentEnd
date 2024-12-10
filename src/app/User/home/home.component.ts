import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BikesComponent } from "../bikes/bikes.component";
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../Services/customer.service';
import { User } from '../../Models/users';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RentalRecordService } from '../../Services/rental-record.service';
import { Status } from '../../Models/rentalRequest';
import { rentalRecord } from '../../Models/rentalRecord';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BsDatepickerModule, BikesComponent, CommonModule, FormsModule, ReactiveFormsModule,PopoverModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  imageUrl: string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-handsome-man-in-jean-is-holding-a-helmet-and-vintage-motorcycle-blur-background-witthaya-prasongsin.jpg';
  imageUrl1:string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-couple-enjoys-the-view-at-the-lake-from-wooden-deck-aleksandargeorgiev.jpg';
  imageUrl2:string ='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/motocross-rider-at-sunset-piola666.jpg';


  users!:User[];
  user!:User
  userName:string = '';
  // nic:string = '';
  // fName :string = '';
  // lName :string = '';
  // email:string = '';
  // cNumber:string = '';
  // address:string = '';
  // accountCreated :string = '';

  editId!:string;

  userEdit:FormGroup;
  currentNicNumber!:string;
  currentUser!:User;
  notifyCount!:number;
  CurrentUserOverDue:rentalRecord[] = [];
  currentRecord!:rentalRecord;

  currentUserId: string ='';
  currentUserRecord!:User;
  
  
  constructor(private fb:FormBuilder, private router:Router, private customerService:CustomerService, private toastr:ToastrService, private rentalRecordService:RentalRecordService, private customerSerive:CustomerService){
    this.userEdit = this.fb.group({
      UserName: [''],
      NicNumber: [''],
      FirstName: [''],
      LastName: [''],
      Email: [''],
      ContactNo: [''],
      Address: [''],
    });

    this.getNotifications();

  }



  ngOnInit(): void {
    const name = localStorage.getItem("name") || "";
    this.userName = name;

    const NicNumber = localStorage.getItem("nicNumber") || "";
    this.currentUserId = NicNumber;
    // const FirstName = localStorage.getItem("FirstName") || "";
    // const LastName = localStorage.getItem("LastName") || "";
    // const Email = localStorage.getItem("Email" ) || "";
    // const ContactNo = localStorage.getItem("ContactNo" ) || "";
    // const cNumber = localStorage.getItem("cNumber" ) || "";
    // const Address = localStorage.getItem("Address" ) || "";
    // const AccountCreated = localStorage.getItem("AccountCreated" ) || "";



    // this.nic = NicNumber;
    // this.fName = FirstName;
    // this.lName = LastName;
    // this.email = Email;
    // this.cNumber = ContactNo;
    // this.address = Address;
    // this.accountCreated = AccountCreated;

   

  }
  
  getNotifications(){
    let user = localStorage.getItem("user");
    if(user){
      let currentUser = JSON.parse(user);
      console.log(currentUser);
      
      this.customerService.getUserById(currentUser.NicNumber).subscribe(data => {
        console.log(data);
        this.currentUser = data;
        // this.notifyCount = this.currentUser?.rentalRequests?.length
        console.log( this.currentUser);
        if(this.currentUser){
          this.rentalRecordService.getOverDueRentals(this.currentUser.nicNumber).subscribe(data => [
            this.CurrentUserOverDue = data
          
            
          ])
          if(this.CurrentUserOverDue.length > 0){
              this.toastr.error("You hanve rental overdue date ")
          }
        }
        
        let acceptedReq = this.currentUser?.rentalRequests?.filter((r:any) => r.status == Status.accepted);
        
        let declinedReq = this.currentUser?.rentalRequests?.filter((a:any) => a.status == Status.declined);
        console.log(acceptedReq);
        console.log(declinedReq);
        acceptedReq?.length == 0 ? '' : this.toastr.info("Accepted our request");
        declinedReq?.length == 0 ? '' : this.toastr.info("Declined our request");

        
      })
    }
  }

  
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  editUser(): void {
let NicNumber =  localStorage.getItem("nicNumber") || ""
  this.currentNicNumber = NicNumber;
    this.customerService.getUserById(NicNumber).subscribe( 
      (res: User) => {
        this.userEdit.patchValue({
          NicNumber: res.nicNumber,
          Email: res.email,
          FirstName: res.firstName,
          LastName: res.lastName,
          ContactNo: res.contactNo,
          Address: res.address,
          UserName: res.userName
        });
      },
      (err) => {
        this.toastr.error(err.error.error);
      }
      
  )}
      
    
  
  
  
  


  // this.bikeTableService.getBikeById(id).subscribe(
  //   (res: Bike) => {
  //     this.bikeForm.patchValue({
  //       brand: res.brand,
  //       model: res.model,
  //       type: res.type,
  //       rentPerHour: res.rentPerHour
  //     });

  // getBikeById(nic:string){
  //   this.customerService.getBikeById(nic).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.user = data;
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.error.error)
  //     }
  //   })

  // }

  updateUser(){
    this.customerService.UpdateUsers(this.currentNicNumber,this.userEdit.value).subscribe({
      next: (data) => {
        console.log(data);
        // this.users = data;
      },
      error: (err) => {
        this.toastr.error(err.error.error)
      }
    })

  }


  displayPayment(recordId: any) {
    console.log(recordId);
    this.rentalRecordService.getRentalRecord(recordId).subscribe(data => {
      console.log('Fetched Rental Record:', data);
      this.currentRecord = data;
   
    })
  }

  // Load the current user's rental history
  loadCurrentUserHistory(): void {
    this.customerSerive.getUserById(this.currentUserId).subscribe(data => {
      console.log(data);
      this.currentUserRecord = data;
      console.log('Fetched Current User Rental History:', data);
    });
  }

}

