import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

import { Statistics, Category, Tag } from './store.model';
import {of } from 'rxjs/observable/of';

@Injectable()
export class StoreService {
  stat: Statistics = null;

  constructor (
    private api: ApiService
  ) {}

  setStat (key: string|Statistics, value?: number) {
    if (!this.stat) {
      this.stat = {};
    }
    if (typeof key === 'object') {
      this.stat = key;
    } else if (typeof this.stat[key] !== 'undefined') {
      this.stat[key] = value;
    }
  }
}
