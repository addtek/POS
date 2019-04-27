import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router, public snackBar: MatSnackBar) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
        this.snackBar.open(message, '', {
            duration: 4000,
        });
    }

    error(error: HttpErrorResponse , keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: error });
        if (error.error.message) {
            this.snackBar.open(error.error.message, '', {
                duration: 4000,
            });
        } else if (error.error.username && error.error.password) {
            this.snackBar.open(error.error.username + ' ' + error.error.password, '', {
            duration: 4000,
        });
        } else if (error.error.username) {
            this.snackBar.open(error.error.username, '', {
                duration: 4000,
            });
        }  else if (error.error.password) {
            this.snackBar.open(error.error.password, '', {
                duration: 4000,
            });
        } else {
            this.snackBar.open(error.error, '', {
                duration: 4000,
            });
            console.log(error);
        }
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
