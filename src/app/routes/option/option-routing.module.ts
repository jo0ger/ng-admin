import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionComponent } from './option/option.component';

const routes: Routes = [
  { path: '', component: OptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRoutingModule { }
