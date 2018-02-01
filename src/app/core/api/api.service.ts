import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http'
import { _HttpClient } from '@delon/theme'
import { environment } from '@env/environment'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class ApiService {

  private HOST: string = environment.production ? 'https://api.jooger.me' : 'http://localhost:3001'
  private prefix: string = '/backend'

  constructor (
    private http: _HttpClient
  ) {}

  wrap (url: string, type: string = 'get') {
    url = this.HOST + this.prefix + url;
    return (body: any, params: any, options?: object): Promise<any> => {
      const args = [url, body, params, options]
      if (['get', 'delete'].includes(type)) {
        args.splice(1, 1)
      }
      return this.http[type](...args).toPromise()
    }
  }

  login (data: {
    name: string,
    password: string
  }, params?: any, opt?: any): Promise<any> {
    return this.wrap('/auth/local/login', 'post')(data, params, opt)
  }

  logout () {}

  getAuthInfo () {}

  newArticle () {}
}
