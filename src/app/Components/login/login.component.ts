import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../Models/login';
import { UserRegisterService } from '../../Services/user-register.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  LoginData!:Login;


  constructor(private fb:FormBuilder, private router:Router, private registerService:UserRegisterService , private toastr:ToastrService){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  onSubmit(){

    if(this.loginForm.valid){
      const LoginData = this.loginForm.value;
      console.log(this.LoginData = this.loginForm.value);
      
      this.registerService.UserLogin(this.LoginData).subscribe(data => {
        localStorage.setItem("token", data);
        if (data) {
          const decoded: any = jwtDecode(data);
          console.log(decoded.roles);
          console.log(decoded);
          if(decoded.roles != "Admin"){
            localStorage.setItem('user', JSON.stringify(decoded));
            this.toastr.success("Login Successfully!!!", "Login");
            this.loginForm.reset();
            this.router.navigate(['user']) 
          }else if(decoded.roles != "User"){
            localStorage.setItem('admin', JSON.stringify(decoded));
            this.toastr.success("Login Successfully!!!", "Login");
            this.loginForm.reset();
            this.router.navigate(['admin']);
  
          }
         
        }
        // this.toastr.success("LogIn Successfully", "LogIn")
        // this.loginForm.reset();
        // this.router.navigate(['/user/bikes']);
    }, error => {
      this.toastr.error(error.error)
    })
  }
    else{
      this.toastr.error('Login Failed');
    }
}



}