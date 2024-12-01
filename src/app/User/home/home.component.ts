import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BikesComponent } from "../bikes/bikes.component";
import { CommonModule } from '@angular/common';
import { user } from '../../Models/user';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BsDatepickerModule, BikesComponent, CommonModule, UserProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  imageUrl: string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-handsome-man-in-jean-is-holding-a-helmet-and-vintage-motorcycle-blur-background-witthaya-prasongsin.jpg';
  imageUrl1:string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-couple-enjoys-the-view-at-the-lake-from-wooden-deck-aleksandargeorgiev.jpg';
  imageUrl2:string ='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/motocross-rider-at-sunset-piola666.jpg';


  users!:user[];
  userName:string = '';

  
  constructor(private router:Router){

  }



  ngOnInit(): void {
    const name = localStorage.getItem("name") || "";
    this.userName = name;
  }
   
  


}
