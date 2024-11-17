import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsDatepickerModule, RouterLink, CommonModule],
  // providers: [
  //   provideAnimations(),
  //   provideToastr()
  // ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StanAloneProject';



}
