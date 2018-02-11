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
import { UploaderComponent } from '@components';
import { BlogService } from './blog.service';

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
    UploaderComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
