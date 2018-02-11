import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.less' ]
})
export class ArticleListComponent implements OnInit {
  stateMap: any = [
    { key: 'all', title: '全部', value: -1 },
    { key: 'published', title: '已发布', value: 1, badge: 'success' },
    { key: 'unpublished', title: '未发布', value: 0, badge: 'default' }
  ];
  filter: any = {
    state: -1,
    keyword: ''
  };
  loading = false;
  list: object[] = [];
  pager: {
    total: number,
    cur_page: number,
    total_page: number,
    per_page: number
  } = {
    total: 0,
    cur_page: 1,
    total_page: 1,
    per_page: 15
  };

  constructor(
    public msg: NzMessageService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  findState (state) {
    return this.stateMap.find(s => s.value === state) || {};
  }

  getArticleList (params: any = {}) {
    params = Object.assign({
      page: this.pager.cur_page
    }, params);
    const keyword: string = this.filter.keyword.trim();
    const state: number = ~~this.filter.state;
    if (keyword) {
      params.keyword = keyword;
    }
    if (state > -1) {
      params.state = state;
    }

    this.loading = true;
    this.api.getArticleList(params).then(res => {
      this.loading = false;
      if (res.success) {
        this.list = res.data.list;
        this.pager = res.data.pagination;
      }
    });
  }

  changeState (state) {
    if (state !== this.filter.state) {
      this.filter.state = state;
    }
    this.getArticleList();
  }

  search () {
    this.getArticleList({ page: 1 });
  }

  togglePublish (index) {
    const article: any = this.list[index];
    if (!article) return;
    this.api.updateArticle(article._id)({
      state: 1 - ~~article.state
    }).then(res => {
      if (res.success) {
        if (this.filter.state < 0) {
          this.list.splice(index, 1, res.data);
        } else {
          this.list.splice(index, 1);
          this.pager.total--;
        }
      }
    });
  }

  add () {
    this.router.navigateByUrl(`/blog/article/create`);
  }

  edit (article) {
    this.router.navigateByUrl(`/blog/article/${article._id}/detail`);
  }

  delete (index) {
    const article: any = this.list[index];
    if (!article) return;
    this.api.deleteArticle(article._id)().then(res => {
      if (res.success) {
        this.list.splice(index, 1);
      }
    });
  }

  pageChange (page) {
    this.getArticleList({ page });
  }
}

