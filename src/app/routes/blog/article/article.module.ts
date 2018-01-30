import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule
  ],
  declarations: [
    ListComponent,
    DetailComponent
  ]
})
export class ArticleModule { }
