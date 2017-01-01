import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const EMAIL_TAKEN: string = "EMAIL_TAKEN";

export class UserRegistrationResponse {
    isSuccessful: boolean;
    failureReason: string;
}
@Injectable()
export class AuthenticationService {
    private userAuthorized: boolean = false;

    authorizeUser(username: string, password: string): Observable<boolean> {
        this.userAuthorized = true;

        return new Observable(observer => {
            observer.next(this.userAuthorized);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed'); };
        });
    }

    isUserAuthenticated() {
        return new Observable(observer => {
            observer.next(this.userAuthorized);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed'); };
        });
    }

    registerUser(userDetails): Observable<UserRegistrationResponse> {
        return new Observable(observer => {
            observer.next({ isSuccessful: false, failureReason: EMAIL_TAKEN });
            observer.complete();
        });
    }
}