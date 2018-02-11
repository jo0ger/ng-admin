import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/api//api.service';
import { Tag } from '@core/store//store.model';

const _: any = require('lodash');
const getDefaultTag = () => _.cloneDeep({
  name: '',
  description: ''
});

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: []
})
export class TagComponent implements OnInit {
  loading = false;
  list: Tag[] = [];
  filter: any = {
    keyword: ''
  };
  modalVisible = false;
  model: Tag = getDefaultTag();

  constructor (
    private api: ApiService
  ) {}

  ngOnInit() {
    this.getTagList();
  }

  getTagList () {
    if (this.loading) return;
    const params: any = {};
    const keyword: string = this.filter.keyword.trim();
    if (keyword) {
      params.keyword = keyword;
    }
    this.loading = true;
    return this.api.getTagList(params).then(res => {
      this.loading = false;
      if (res.success) {
        this.list = res.data;
      }
    });
  }

  search () {
    this.getTagList();
  }

  add () {
    this.model = getDefaultTag();
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
    const api = this.model._id ? this.api.updateTag(this.model._id) : this.api.newTag;
    api({ name, description, list }).then(res => {
      this.loading = false;
      if (res.success) {
        this.modalVisible = false;
        this.getTagList();
      }
    });
  }

  cancel () {
    this.modalVisible = false;
    this.model = getDefaultTag();
  }

  delete (index: number) {
    const category = this.list[index];
    if (!category) return;
    this.api.deleteTag(category._id)().then(res => {
      if (res.success) {
        this.list.splice(index, 1);
      }
    });
  }
}
