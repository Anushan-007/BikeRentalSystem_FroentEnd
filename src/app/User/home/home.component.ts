import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BikesComponent } from "../bikes/bikes.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BsDatepickerModule, BikesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
