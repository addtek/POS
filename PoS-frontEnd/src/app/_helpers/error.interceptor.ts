import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { AlertService } from '../_services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private alert: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status !== 200) {
                this.alert.error(err);
                // auto logout if 401 response returned from api
                // setTimeout(() => {
                //     this.authenticationService.logoutUser();
                //     location.reload(true);
                // }, 500);
            }
            // else if (err.status !== 200) {
            //     // auto logout if 401 response returned from api
            //     this.alert.error(err);
            // }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
