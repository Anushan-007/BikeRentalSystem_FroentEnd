import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterService } from '../../Services/user-register.service';
import { ToastrService } from 'ngx-toastr';
import { user } from '../../Models/user';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,HttpClientModule,],
 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registrationForm !: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  user!:user;
  // Iuser! :Iuser;

  constructor(private fb: FormBuilder, private registerService: UserRegisterService, private router:Router, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nicNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNo: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      passwordHash: ['', [Validators.required]],
      roles: ['user', [Validators.required]],
      userName: ['', [Validators.required]],
      profileImage: [null, []]
    });
  }

  // Handle image preview
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.registrationForm.patchValue({ profileImage: file });
    }
}

onSubmit(registrationForm:any){
  if (this.registrationForm.valid) {
    const user = this.registrationForm.value;
    
    this.registerService.AddRegisterUser(user).subscribe(data => {
      this.toaster.success("Sign Up Successfully", "Sign Up")
     console.log(data);
     this.registrationForm.reset();
     this.router.navigate(['/login']);
    }, error => {
      this.toaster.error(error)
    });
  } else {
    this.toaster.error('Form is invalid');
  }

}




  //  this.user = registrationForm.value;
  //  this.user.roles = parseInt(this.registrationForm.value.roles)
    
  //  this.registerService.AddRegisterUser(this.registrationForm).subscribe(data =>{
  //    this.toaster.success("Sign Up Successfully", "Sign Up")
  //    console.log(data);
  //    this.registrationForm.reset();
  //    this.router.navigate(['/login']);
  //  })




}


