import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../Models/user';
import { Login } from '../Models/login';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient, private router:Router) { }

  userRegisterURL = 'http://localhost:5268/api/User/userRegister';
  userLoginURL = 'http://localhost:5268/api/User/login';
  

  AddRegisterUser(UserRegister:user){
    return this.http.post<user>(this.userRegisterURL, UserRegister)
   
  }

  UserLogin(login:Login){
    return this.http.post(this.userLoginURL, login, {
      responseType:'text'
    })
  }


  isLoggedIn(){
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded:any = jwtDecode(token);
        console.log(decoded);
        
        localStorage.setItem("name", decoded.UserName)
        localStorage.setItem("Role", decoded.roles)

      }
      return true;
    }else{
      return false;
    }
  }


}



