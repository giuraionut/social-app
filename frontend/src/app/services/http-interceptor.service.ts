import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APIResponse } from '../models/api-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          let response: APIResponse = event.body;
          console.log('Debug:', response.message);
          if (response.error === 'wrong credentials') {
            this.snackBar.open(
              'Authentication failed, please check username and password.',
              'Close',
              { duration: 4000 }
            );
          }
          if (response.error === 'duplicate found') {
            this.snackBar.open(
              'Username or email is already taken.',
              'Close',
              { duration: 4000 }
            );
          }
          if (response.error !== 'none') {
            console.log(response.message);
            throw new Error(response.error);
          }
        }
        return event;
      }),
      catchError(() => [])
    );
  }
}
