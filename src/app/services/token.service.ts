import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { HttpUtilService } from "./http.util.service";
import { Observable } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
  })
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService= new JwtHelperService();
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    }
    getToken():string | null {
        if(isPlatformBrowser(this.platformId)) {
        return localStorage.getItem(this.TOKEN_KEY)
        }
        return null;
    }
    setToken(token: string):void {
        localStorage.setItem(this.TOKEN_KEY,token)
    }
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY)
    }
    getUserId(): number {
        let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');

    // Check if userObject is not null before checking 'userId'
    if (userObject && 'userId' in userObject) {
        return Number(userObject['userId']);
    } else {
        return 0;
    }
    }
    isTokenExpired(): boolean {
        if(this.getToken() == null) {
            return false;
        }
        return this.jwtHelperService.isTokenExpired(this.getToken()!);
    }
}
