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
  { path: 'article', component: ArticleListComponent, data: { title: '博客文章' } },
  { path: 'article/:articleId/detail', component: ArticleDetailComponent, data: { title: '文章详情' } },
  { path: 'article/create', component: ArticleDetailComponent, data: { title: '新建文章' } },
  { path: 'category', component: CategoryComponent, data: { title: '文章分类' } },
  { path: 'tag', component: TagComponent, data: { title: '文章标签' } },
  { path: 'comment', component: CommentComponent, data: { title: '文章评论' } },
  { path: 'user', component: UserListComponent, data: { title: '博客用户' } },
  { path: 'user/:userId/detail', component: UserDetailComponent, data: { title: '用户详情' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
