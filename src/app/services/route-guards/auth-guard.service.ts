import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';
import { StoreService } from '@core/store/store.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor (
    private router: Router,
    private msg: NzMessageService,
    private api: ApiService,
    private store: StoreService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  private getNoCheckPage (url: string): boolean {
    return [this.tokenService.login_url].includes(url);
  }

  private checkLogin (url: string): boolean {
    const tokenData = this.tokenService.get();
    const isNoCheckPage = this.getNoCheckPage(url);
    if (tokenData && tokenData.token) {
      // if (!this.store.stat) {
      //   this.setStat()
      // }
      if (isNoCheckPage) {
        this.msg.success('已登录');
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    } else if (isNoCheckPage) {
      return true;
    }
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private setStat (): void {
    this.api.getStat().then(data => {
      this.store.setStat(data);
    });
  }
}
