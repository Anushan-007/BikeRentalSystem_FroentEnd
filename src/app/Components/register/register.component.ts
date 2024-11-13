import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterService } from '../../Services/user-register.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registrationForm !: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private registerService: UserRegisterService, private router:Router, private toaster:ToastrService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nicNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

onSubmit(){
    this.registrationForm.value;
   console.log(this.registrationForm.value);
   this.registrationForm.reset()
}



}


