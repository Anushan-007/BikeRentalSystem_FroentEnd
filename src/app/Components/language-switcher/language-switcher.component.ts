import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService } from '../../Services/language.service';

/**
 * LanguageSwitcherComponent
 *
 * A compact flag + dropdown language picker that can be placed
 * anywhere in the app (login page, navbar, etc.).
 *
 * Usage:
 *   <app-language-switcher></app-language-switcher>
 *
 * When the user selects a language:
 *  1. ngx-translate switches the active language bundle.
 *  2. The selection is saved to localStorage.
 *  3. The entire UI re-renders in the new language instantly.
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  languages: ReturnType<LanguageService['supportedLanguages']['slice']> = [];
  currentLang = 'en';
  isOpen = false;

  private destroy$ = new Subject<void>();

  constructor(private langService: LanguageService, private elRef: ElementRef) {}

  /** Close dropdown when user clicks anywhere outside this component */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
    // Initialize here so langService is fully constructed first
    this.languages = this.langService.supportedLanguages;

    this.langService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => (this.currentLang = lang));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentLangObj() {
    return this.languages.find(l => l.code === this.currentLang);
  }

  select(code: string): void {
    this.langService.setLanguage(code);
    this.isOpen = false;
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation(); // prevent document click from immediately closing it
    this.isOpen = !this.isOpen;
  }
}
