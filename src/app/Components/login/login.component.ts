import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../Models/login';
import { UserRegisterService } from '../../Services/user-register.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  LoginData!: Login;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: UserRegisterService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

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
        const token = data.token;
        localStorage.setItem("token", token);
        if (token) {
          const decoded: any = jwtDecode(token);
          if (decoded.roles != "Admin") {
            localStorage.setItem('user', JSON.stringify(decoded));
            this.toastr.success(this.translate.instant('LOGIN_SUCCESS'), "Login");
            this.loginForm.reset();
            this.router.navigate(['user']);
          } else if (decoded.roles != "User") {
            localStorage.setItem('admin', JSON.stringify(decoded));
            this.toastr.success(this.translate.instant('LOGIN_SUCCESS'), "Login");
            this.loginForm.reset();
            this.router.navigate(['admin']);
          }
        }
      }, error => {
        this.toastr.error(error.error);
      });
    } else {
      this.toastr.error(this.translate.instant('LOGIN_FAILED'));
    }
  }



}