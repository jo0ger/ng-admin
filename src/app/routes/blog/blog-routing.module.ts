import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: 'article', loadChildren: './article/article.module#ArticleModule' },
  { path: 'category', component: CategoryComponent },
  { path: 'tag', component: TagComponent },
  { path: 'comment', component: CommentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
