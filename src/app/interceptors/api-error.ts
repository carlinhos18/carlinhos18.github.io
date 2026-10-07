import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let friendlyMessage = 'Something went wrong. Please try again.';

      if (error.status === 400) {
        friendlyMessage = error.error?.error || 'Check your fields and try again.';
      } else if (error.status === 403) {
        friendlyMessage = error.error?.error || 'Security check failed. Please refresh and try again.';
      } else if (error.status === 429) {
        friendlyMessage = 'Too many attempts, try later.';
      } else if (error.status >= 500) {
        friendlyMessage = 'Something went wrong. Please try again later.';
      } else if (error.error?.error) {
        friendlyMessage = error.error.error;
      }

      return throwError(() => new Error(friendlyMessage));
    })
  );
};
