import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor (
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  checkLogin (): boolean {
    const tokenData = this.tokenService.get()
    if (tokenData && tokenData.token) {
      return true
    }
    this.router.navigate(['/login'])
  }

  canActivate (route: ActivatedRouteSnapshot): boolean {
    return this.checkLogin()
  }

  canActivateChild (route: ActivatedRouteSnapshot): boolean {
    return this.canActivate(route)
  }
}