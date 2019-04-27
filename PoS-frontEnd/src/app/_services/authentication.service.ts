import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private alertService: AlertService, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`,
        { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }),
            catchError(( err: HttpErrorResponse ) => {
                this.handleError(err);
                return Observable.throw(err);
            })
            );
            }

    logoutUser(userID) {
        // remove user from local storage to log user out
       return this.http.post(`${environment.apiUrl}/users/authenticate/logout`, {id: userID})
        .subscribe(user => {
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
                this.router.navigate(['users/authenticate/login']);

            },
            catchError(( err: HttpErrorResponse ) => {
                this.handleError(err);
                return Observable.throw(err);
            })
            );
    }
    updateUser (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
    forgotPassword( email) {
         this.http.post(`${environment.apiUrl}/users/reset/password`, {email: email})
        .subscribe(res => {
                localStorage.removeItem('currentUser');
                this.currentUserSubject.next(null);
                this.alertService.success(res.toString());
            },
            catchError(( err: HttpErrorResponse ) => {
                this.handleError(err);
                return Observable.throw(err);
            })
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.headers}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

}
