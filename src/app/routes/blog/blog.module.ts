import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { CommentComponent } from './comment/comment.component';
import { ArticleListComponent } from './article/list/list.component';
import { ArticleDetailComponent } from './article/detail/detail.component';
import { UserListComponent } from './user/list/list.component';
import { UserDetailComponent } from './user/detail/detail.component';
import { BlogStatComponent } from '@components/blog-stat/blog-stat.component';

@NgModule({
  imports: [
    SharedModule,
    BlogRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    CategoryComponent,
    TagComponent,
    CommentComponent,
    UserListComponent,
    UserDetailComponent,
    BlogStatComponent
  ]
})
export class BlogModule { }
