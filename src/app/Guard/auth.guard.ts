import { Injectable } from '@angular/core';
import {  CanActivate,  Router,  } from '@angular/router';
import { UserRegisterService } from '../Services/user-register.service';


@Injectable({
  providedIn:'root'
})



export class AuthGuard implements CanActivate { 
  constructor(private registerService: UserRegisterService, private router: Router) {
  } 

  canActivate(): boolean { 
  if (this.registerService.isLoggedIn()) { 
  return true; 
  } else { 
  this.router.navigate(['/login']); 
  return false; 
  } 
  }


  
}
  
