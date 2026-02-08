import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers,
  provideToastr(),]
});