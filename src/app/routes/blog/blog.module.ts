import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [
    CategoryComponent,
    TagComponent,
    CommentComponent
]
})
export class BlogModule { }
