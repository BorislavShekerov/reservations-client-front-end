import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const EMAIL_TAKEN: string = "EMAIL_TAKEN";

export class UserRegistrationResponse {
    isSuccessful: boolean;
    failureReason: string;
}
@Injectable()
export class AuthenticationService {
    private userAuthenticated: boolean = true;

    authorizeUser(username: string, password: string): Observable<boolean> {
        this.userAuthenticated = true;

        return new Observable(observer => {
            observer.next(this.userAuthenticated);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed'); };
        });
    }

    isUserAuthenticated(): boolean {
        return this.userAuthenticated;
    }

    registerUser(userDetails): Observable<UserRegistrationResponse> {
        return new Observable(observer => {
            observer.next({ isSuccessful: false, failureReason: EMAIL_TAKEN });
            observer.complete();
        });
    }
}