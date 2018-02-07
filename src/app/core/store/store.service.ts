import { Injectable } from "@angular/core";

import { Statistics } from './store.model';

@Injectable()
export class StoreService {
  stat: Statistics = null

  setStat (key: string|Statistics, value?: number) {
    if (!this.stat) {
      this.stat = {}
    }
    if (typeof key === 'object') {
      this.stat = key
    } else if (typeof this.stat[key] !== 'undefined') {
      this.stat[key] = value
    }
  }
}
