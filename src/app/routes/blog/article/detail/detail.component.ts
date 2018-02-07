import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-article-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class ArticleDetailComponent implements OnInit {
  createMode = true
  loading = false
  articleId = ''
  detail = {
    title: '一篇新文章',
    content: '文章的内容'
  };

  constructor(
    public msg: NzMessageService,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route)
    this.articleId = this.route.snapshot.paramMap.get('articleId') || ''
    if (this.articleId) {
      this.createMode = false
      this.getArticleDetail()
    }
  }

  getArticleDetail () {
    this.loading = true
    this.api.getArticleDetail(this.articleId)().then(res => {
      if (res.success) {
        this.detail = res.data
      }
    })
  }
}
