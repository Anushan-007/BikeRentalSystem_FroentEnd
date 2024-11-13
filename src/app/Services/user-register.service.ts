import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient) { }

  userRegisterURL = 'http://localhost:5268/api/User/userRegister'

  AddRegisterUser(UserRegister:user){
    return this.http.post<user>(this.userRegisterURL, UserRegister)
   
  }

}
