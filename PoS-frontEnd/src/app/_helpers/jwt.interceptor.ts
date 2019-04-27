import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private http: HttpClient, private tokenExtractor: HttpXsrfTokenExtractor
) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const headerName = 'XSRF-TOKEN';
        const token = this.tokenExtractor.getToken() as string;
        if (token !== null && !request.headers.has(headerName)) {
            request = request.clone({ headers: request.headers.set(headerName, token) });
        }
        return next.handle(request);
    }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authReq = req.clone({
//       headers: req.headers.set('Authorization', /* here you fetch your jwt */this.getToken())
//         .append('Access-Control-Allow-Origin', '*')
//     });
//     return next.handle(authReq).do((event: HttpEvent<any>) => {
//       if (event instanceof HttpResponse) {
//         // do stuff with response if you want
//       }
//     }, (response: HttpErrorResponse) => { });
//   }

//   getToken() {
//     let headers: HttpHeaders = new HttpHeaders();
//     headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//     return this.http.post('http://myapi/api.php/user', {
//       username: 'admin',
//       password: 'password'
//     }, { headers });
//   }
}
