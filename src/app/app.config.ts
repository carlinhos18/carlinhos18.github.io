import { ApplicationConfig, ErrorHandler, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiErrorInterceptor } from './interceptors/api-error';
import { GlobalErrorHandler } from './services/error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([apiErrorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
