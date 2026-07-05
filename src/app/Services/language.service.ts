import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

/**
 * LanguageService
 *
 * Manages the active language for the entire Riders Heaven application.
 * - Reads the saved language from localStorage on startup.
 * - Switches ngx-translate to the selected language.
 * - Notifies components via currentLanguage$ observable.
 *
 * Inject this service anywhere in the app to get or set the language.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'rh_language';
  private readonly DEFAULT_LANG = 'en';

  readonly supportedLanguages: SupportedLanguage[] = [
    { code: 'en', name: 'English',  nativeName: 'English', flag: '🇬🇧' },
    { code: 'ta', name: 'Tamil',    nativeName: 'தமிழ்',   flag: '🇮🇳' },
    { code: 'si', name: 'Sinhala',  nativeName: 'සිංහල',   flag: '🇱🇰' }
  ];

  /** Emits the current language code whenever it changes */
  currentLanguage$ = new BehaviorSubject<string>(this.DEFAULT_LANG);

  constructor(private translate: TranslateService) {}

  /**
   * Called once in AppComponent.ngOnInit().
   * Restores the language the user last selected.
   */
  initialize(): void {
    const codes = this.supportedLanguages.map(l => l.code);
    this.translate.addLangs(codes);

    const saved = localStorage.getItem(this.STORAGE_KEY);
    const lang  = saved && codes.includes(saved) ? saved : this.DEFAULT_LANG;
    this.applyLanguage(lang);
  }

  /** Switch to a different language and persist the choice */
  setLanguage(code: string): void {
    this.applyLanguage(code);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage$.getValue();
  }

  private applyLanguage(code: string): void {
    this.translate.use(code);
    localStorage.setItem(this.STORAGE_KEY, code);
    this.currentLanguage$.next(code);
    document.documentElement.setAttribute('lang', code);
  }
}
