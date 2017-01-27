import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserTokenRequestHandler {
    constructRequestHeaders(userAccessToken: boolean): RequestOptions{
        let headers: Headers;
        if(userAccessToken){
            headers = new Headers({ 'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUserTokens')).accessJwtToken });
        }else{
            headers = new Headers({ 'X-Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUserTokens')).refreshToken });
        }
        
        let options = new RequestOptions({ headers: headers });

        return options;
    }
}
