import { Injectable, inject } from "@angular/core"; // Make sure to import 'inject' from '@angular/core'
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { TokenService } from "../services/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(private tokenService: TokenService,
        private userService: UserService,
        private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        const user: User = this.userService.getUserFromLocalStorage();
        const isAdmin = user.role.name == 'ADMIN';
        if (!isTokenExpired && isUserIdValid && isAdmin) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}

// Corrected AuthGuardFn syntax
export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AdminGuard).canActivate(next, state);
};
