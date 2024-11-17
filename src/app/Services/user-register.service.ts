import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../Models/user';
import { Login } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient) { }

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
        
        localStorage.setItem("name", decoded.userName)
        localStorage.setItem("Role", decoded.Role)
      }
      return true;
    }else{
      return false;
    }
  }


}
function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}

