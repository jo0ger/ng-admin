import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimpleInterceptor } from '@delon/auth';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { StartupService } from './startup/startup.service';
import { DefaultInterceptor } from './net/default.interceptor';
import { ApiService } from './api/api.service';
import { StoreService } from './store/store.service';

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
    ApiService,
    StoreService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
