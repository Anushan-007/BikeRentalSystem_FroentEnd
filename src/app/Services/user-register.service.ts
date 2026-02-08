import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../Models/login';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { User } from '../Models/users';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient, private router:Router) { }

  userRegisterURL = 'http://localhost:5268/api/User/userRegister';
  userLoginURL = 'http://localhost:5268/api/User/login';
  

  AddRegisterUser(UserRegister:User){
    return this.http.post<User>(this.userRegisterURL, UserRegister)
   
  }

  UserLogin(login:Login){
    return this.http.post<{token: string}>(this.userLoginURL, login)
  }


  isLoggedIn(){
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded:any = jwtDecode(token);
        console.log(decoded);
        
        localStorage.setItem("name", decoded.UserName)
        // localStorage.setItem("FirstName", decoded.FirstName)
        // localStorage.setItem("LastName", decoded.LastName)
        // localStorage.setItem("Email", decoded.Email)
        // localStorage.setItem("ContactNo", decoded.ContactNo)
        // localStorage.setItem("Address", decoded.Address)
        // localStorage.setItem("Role", decoded.roles)
        localStorage.setItem("nicNumber", decoded.NicNumber)
       // console.log(localStorage.setItem("nicNumber", decoded.nicNumber));
        
      }
      return true;
    }else{
      return false;
    }
  }


}



