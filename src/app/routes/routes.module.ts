import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { LoginComponent } from './login/login.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

@NgModule({
	imports: [ SharedModule, RouteRoutingModule ],
	declarations: [
		DashboardComponent,
		LoginComponent,
		CallbackComponent,
		Exception403Component,
		Exception404Component,
		Exception500Component
	]
})
export class RoutesModule {}
