import { Component } from '@angular/core';
import { BikeTableComponent } from '../bike-table/bike-table.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [BikeTableComponent, RouterLink, RouterOutlet],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

}
