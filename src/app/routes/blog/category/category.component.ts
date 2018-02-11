import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api//api.service';
import { Category } from '@core/store//store.model';

const _: any = require('lodash');
const getDefaultCategory = () => _.cloneDeep({
  name: '',
  description: '',
  list: 1
});

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent implements OnInit {
  loading = false;
  list: Category[] = [];
  filter: any = {
    keyword: ''
  };
  modalVisible = false;
  model: Category = getDefaultCategory();

  constructor (
    private api: ApiService
  ) {}

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList () {
    if (this.loading) return;
    const params: any = {};
    const keyword: string = this.filter.keyword.trim();
    if (keyword) {
      params.keyword = keyword;
    }
    this.loading = true;
    return this.api.getCategoryList(params).then(res => {
      this.loading = false;
      if (res.success) {
        this.list = res.data;
      }
    });
  }

  search () {
    this.getCategoryList();
  }

  add () {
    this.model = getDefaultCategory();
    this.modalVisible = true;
  }

  edit (index: number) {
    const category = this.list[index];
    if (!category) return;
    this.model = _.cloneDeep(category);
    this.modalVisible = true;
  }

  submit () {
    const { name, description, list } = this.model;
    this.loading = true;
    const api = this.model._id ? this.api.updateCategory(this.model._id) : this.api.newCategory;
    api({ name, description, list }).then(res => {
      this.loading = false;
      if (res.success) {
        this.modalVisible = false;
        this.getCategoryList();
      }
    });
  }

  cancel () {
    this.modalVisible = false;
    this.model = getDefaultCategory();
  }

  delete (index: number) {
    const category = this.list[index];
    if (!category) return;
    this.api.deleteCategory(category._id)().then(res => {
      if (res.success) {
        this.list.splice(index, 1);
      }
    });
  }

  move (index: number, nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= this.list.length) return;
    const cur = this.list[index];
    const next = this.list[nextIndex];
    Promise.all([
      this.api.updateCategory(cur._id)({ list: next.list }),
      this.api.updateCategory(next._id)({ list: cur.list })
    ]).then(() => {
      this.getCategoryList();
    });
  }
}
