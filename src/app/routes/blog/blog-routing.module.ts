import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { CommentComponent } from './comment/comment.component';
import { ArticleListComponent } from './article/list/list.component'
import { ArticleDetailComponent } from './article/detail/detail.component'
import { UserListComponent } from './user/list/list.component'
import { UserDetailComponent } from './user/detail/detail.component'

const routes: Routes = [
  { path: 'article', component: ArticleListComponent },
  { path: 'article/:articleId/detail', component: ArticleDetailComponent },
  { path: 'article/create', component: ArticleDetailComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'tag', component: TagComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'user', component: UserListComponent },
  { path: 'user/:userId/detail', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
