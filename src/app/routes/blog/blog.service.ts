import { Injectable } from '@angular/core'

@Injectable()
export class BlogService {
  getExtendsItemByKey (key = '', extend = []) {
    if (!key || !(typeof key === 'string') || !Array.isArray(extend) || !extend.length) {
      return null
    }
    const item = extend.find(item => item.key === key)
    return item ? item.value : null
  }
}
