import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';
import { BlogService } from '../../blog.service';

import 'rxjs/add/operator/switchMap';
const _ = require('lodash');
const moment = require('moment');

@Component({
  selector: 'app-article-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class ArticleDetailComponent implements OnInit {
  createMode = true;	// 新建文章
  fetching = false;
  loading = false;
  articleId = '';
  detail: any = {};
  model: any = {
    title: '一篇新文章',
    content: '文章的内容'
  };
  keywords: string[] = [];
  categoryList = [];
  tagList = [];

  constructor(
    public router: Router,
    public msg: NzMessageService,
    private api: ApiService,
    private route: ActivatedRoute,
    public blog: BlogService
  ) { }

  get uploadName () {
    const date = this.detail.createdAt ? moment(this.detail.createdAt) : moment();
    return `source/${date.format('YYYYMMDD')}/`;
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('articleId') || '';
    if (this.articleId) {
      this.createMode = false;
    }
    Promise.all([
      this.getArticleDetail(),
      this.getCategoryList(),
      this.getTagList()
    ].slice(this.createMode ? 1 : 0, 3)).then(() => {
      if (this.detail.category) {
        for (let i = 0; i < this.categoryList.length; i++) {
          const category = this.categoryList[i];
          if (category._id === this.detail.category._id) {
            category.selected = true;
            break;
          }
        }
      }
      if (this.detail.tag && this.detail.tag.length) {
        for (let j = 0; j < this.tagList.length; j++) {
          const tag = this.tagList[j];
          if (this.detail.tag.find(item => item._id === tag._id)) {
            tag.selected = true;
          }
        }
      }
      (window as any).$$$ = this;
    });
  }

  setModel (data) {
    this.detail = data;
    this.keywords = this.detail.keywords.slice();
    this.model = _.cloneDeep(data);
  }

  getArticleDetail () {
    this.fetching = true;
    return this.api.getArticleDetail(this.articleId)().then(res => {
      this.fetching = false;
      if (res.success) {
        this.setModel(res.data);
      }
    });
  }

  getCategoryList () {
    return this.api.getCategoryList().then(res => {
      if (res.success) {
        this.categoryList = res.data.map(item => {
          return {
            ...item,
            icon: this.blog.getExtendsItemByKey('icon', item.extends),
            selected: false
          };
        });
      }
    });
  }

  getTagList () {
    return this.api.getTagList().then(res => {
      if (res.success) {
        this.tagList = res.data.map(item => {
          return {
            ...item,
            selected: false
          };
        });
      }
    });
  }

  categoryChange (index: number) {
    const category = this.categoryList[index];
    if (category.selected) return;
    for (let i = 0; i < this.categoryList.length; i++) {
      const tmp = this.categoryList[i];
      if (tmp.selected) {
        tmp.selected = false;
        break;
      }
    }
    category.selected = true;
    this.model.category = category;
  }

  tagSelect (selected: boolean, index: number) {
    this.tagList[index].selected = selected;
    this.model.tag = this.tagList.filter(tag => tag.selected);
  }

  updateThumb (thumb) {
    this.detail.thumb = this.model.thumb = thumb;
  }

  publish (state) {
    this.submit({ state });
  }

  submit (data: any = {}) {
    this.loading = true;
    const change: any = {};
    if (this.model.category) {
      change.category = this.model.category._id;
    }
    if (this.model.tag && this.model.tag.length) {
      change.tag = this.model.tag.reduce((sum, tag) => {
        if (tag.selected) {
          sum.push(tag._id);
        }
        return sum;
      }, []);
    }
    const api = this.createMode ? this.api.newArticle : this.api.updateArticle(this.detail._id);
    api(Object.assign(this.model, data, change)).then(res => {
      this.loading = false;
      if (res.success) {
        if (!this.createMode) {
          // 编辑
          this.setModel(res.data);
        } else {
          // 新建
          this.router.navigateByUrl(`/blog/article`);
        }
      }
    });
  }
}
