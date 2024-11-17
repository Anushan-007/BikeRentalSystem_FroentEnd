import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BikesComponent } from "../bikes/bikes.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BsDatepickerModule, BikesComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrl: string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-handsome-man-in-jean-is-holding-a-helmet-and-vintage-motorcycle-blur-background-witthaya-prasongsin.jpg';
  imageUrl1:string = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/cute-couple-enjoys-the-view-at-the-lake-from-wooden-deck-aleksandargeorgiev.jpg';
  imageUrl2:string ='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/motocross-rider-at-sunset-piola666.jpg';
}
