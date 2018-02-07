import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';

import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app-article-detail',
	templateUrl: './detail.component.html',
	styles: [ './detail.component.less' ]
})
export class ArticleDetailComponent implements OnInit {
	createMode = true;	// 新建文章
	loading = false;
	articleId = '';
	detail: any = {
		title: '一篇新文章',
		content: '文章的内容'
	};
	keywords: string[] = [];
	categoryList = [];
	tagList = [];

	constructor(
		public msg: NzMessageService,
		private api: ApiService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		console.log(this);
		this.articleId = this.route.snapshot.paramMap.get('articleId') || '';
		if (this.articleId) {
			this.createMode = false;
			Promise.all([
				this.getArticleDetail(),
				this.getCategoryList(),
				this.getTagList()
			]).then(() => {
				for (let i = 0; i < this.categoryList.length; i++) {
					const category = this.categoryList[i];
					if (category._id === this.detail.category._id) {
						category.selected = true;
						break;
					}
				}
				for (let j = 0; j < this.tagList.length; j++) {
					const tag = this.tagList[j];
					if (this.detail.tag.find(item => item._id === tag._id)) {
						tag.selected = true;
					}
				}
				(window as any).$$$ = this;
			});
		}
	}

	getArticleDetail () {
		this.loading = true;
		return this.api.getArticleDetail(this.articleId)().then(res => {
			if (res.success) {
				this.detail = res.data;
				this.keywords = this.detail.keywords.slice();
			}
		});
	}

	getCategoryList () {
		return this.api.getCategoryList().then(res => {
			if (res.success) {
				this.categoryList = res.data.map(item => {
					return {
						...item,
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

	categoryChange (selected: boolean, index: number) {
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
	}

	tagSelect (selected: boolean, index: number) {
		this.tagList[index].selected = selected;
	}

	selectThumb () {}

	updateThumb () {}

	submit () {}
}
