import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OptionRoutingModule } from './option-routing.module';
import { OptionComponent } from './option/option.component';

@NgModule({
  imports: [
    SharedModule,
    OptionRoutingModule
  ],
  declarations: [
    OptionComponent
  ]
})
export class OptionModule { }
