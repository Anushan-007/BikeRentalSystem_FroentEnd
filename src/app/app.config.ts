import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Services/auth-interceptor.service';

// ── ngx-translate ─────────────────────────────────────────────────────────────
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },

    // Angular 18 serves static files from the /public folder (not /src/assets).
    // Files live at: public/assets/i18n/en.json
    // At runtime the dev-server exposes them as: /assets/i18n/en.json
    provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),

    // Step 2: Tell TranslateModule to USE TranslateHttpLoader as the loader
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'en',           // fallbackLang replaces deprecated defaultLanguage
        loader: {
          provide:  TranslateLoader,
          useClass: TranslateHttpLoader
        }
      })
    )
  ]
};


