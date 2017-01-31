import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { UserTokens } from '../model/user-tokens';
import { Subject } from 'rxjs/Subject';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserTokenRequestHandler } from './user-token-request-handler.service';

export const EMAIL_TAKEN: string = "EMAIL_TAKEN";

export class UserRegistrationResponse {
    isSuccessful: boolean;
    failureReason: string;
}

@Injectable()
export class AuthenticationService implements CanActivate {
    private signUpUrl: string = "/api/auth/signUp";
    private authenticationUrl: string = "/api/auth/login";
    private tokenRefreshUrl: string = "/api/auth/token";
    userAuthenticatedEventStream = new Subject<boolean>();

    constructor(private http: Http, private router: Router, private userTokenRequestHandler: UserTokenRequestHandler) { }

    authenticateUser(emailToAuthenticate: string, passwordInput: string): Observable<boolean> {
        return this.http
            .post(this.authenticationUrl, { email: emailToAuthenticate, password: passwordInput })
            .map((r: Response) => {
                let responseJson = r.json();
                localStorage.setItem('currentUser', JSON.stringify(responseJson.userDetails));
                localStorage.setItem('currentUserTokens', JSON.stringify(responseJson.jwtTokens));

                this.userAuthenticatedEventStream.next(true);
                return true;
            });
    }

    isUserAuthenticated(): boolean {
        return localStorage.getItem('currentUser') != undefined;
    }

    registerUser(userDetails): Observable<UserRegistrationResponse> {
        return this.http
            .post(this.signUpUrl, userDetails)
            .map((r: Response) => {

                return { isSuccessful: true };
            });
    }

    getUserAuthenticatedEventStream(): Subject<boolean> {
        return this.userAuthenticatedEventStream;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isUserAuthenticated()) {
            return true;
        }

        this.router.navigate(['/search/listview', { loginRequested: true }]);
        return false;
    }

    refreshAccessToken(): Observable<boolean> {
        return this.http
            .get(this.tokenRefreshUrl, this.userTokenRequestHandler.constructRequestHeaders(false))
            .map((r: Response) => {
                localStorage.setItem('currentUserTokens', JSON.stringify(r.json()));

                this.userAuthenticatedEventStream.next(true);
                return true;
            }).catch(this.handleRefreshAccessTokenError);
    }

    handleRefreshAccessTokenError(error: Response | any) {
        let errorCode: number;
        if (error instanceof Response) {

            if(error.status == 401){
                localStorage.removeItem('currentUser');
                localStorage.removeItem('currentUserTokens');

                this.userAuthenticatedEventStream.next(false);
                errorCode = 12;
            }
        } else {
            errorCode = 0;
        }

        return Observable.throw(errorCode);
    }

    logUserOut(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserTokens');
        
        this.userAuthenticatedEventStream.next(false);
    }
}