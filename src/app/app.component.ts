import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsDatepickerModule],
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
