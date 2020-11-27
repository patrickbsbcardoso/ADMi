import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(requisicao: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(requisicao).pipe(
      catchError(
        err => {
          if (err.status === 401) {
            this.authService.logout();
            location.reload(true);
          }
          return throwError(err);
        }
      ));
  }
}
