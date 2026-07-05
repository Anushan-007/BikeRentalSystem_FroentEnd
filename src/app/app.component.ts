import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LanguageService } from './Services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsDatepickerModule, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Riders Heaven';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Restore the user's saved language preference on every page load
    this.languageService.initialize();
  }
}
