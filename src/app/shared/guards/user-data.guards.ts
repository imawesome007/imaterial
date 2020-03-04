import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/userDashboard/user.service';

@Injectable()
export class UserDataGuardService implements CanActivate {

    constructor(private router: Router,
        private _userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        const userId = localStorage.getItem("userId");
        return this._userService.getUserInfo(userId).then(res => {
            if ((res.data[0].firstName === null || res.data[0].firstName === "") && (res.data[0].lastName === null || res.data[0].lastName === "")) {
                return true;
            }
            this.router.createUrlTree(['/dashboard']);
        });
    }
}