import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import 'rxjs/add/operator/toPromise';

const OSS: any = require('ali-oss');
const slice = obj => Array.prototype.slice.call(obj);

@Injectable()
export class ApiService {

  private HOST: string = environment.production ? 'https://api.jooger.me' : 'http://localhost:3001';
  private prefix = '/backend';
  private defaultOpts: object = {
    withCredentials: true,
    responseType: 'json'
  };
  private _aliyunClient = null;

  constructor (
    private http: _HttpClient
  ) {}

  private wrap (url: string, type: string = 'get') {
    url = this.HOST + this.prefix + url;
    return (params?: any, options?: object): Promise<any> => {
      const noBody = ['get', 'delete'].includes(type);
      options = Object.assign({}, this.defaultOpts, options, noBody ? {
        params
      } : {
        body: params
      });
      return this.http.request(type.toUpperCase(), url, options).toPromise();
    };
  }

  private get (url: string) {
    return this.wrap(url, 'get');
  }

  private post (url: string) {
    return this.wrap(url, 'post');
  }

  private patch (url: string) {
    return this.wrap(url, 'patch');
  }

  private delete (url: string) {
    return this.wrap(url, 'delete');
  }


  public login = this.post('/auth/local/login');

  public logout = this.get('/auth/local/logout');

  public getStat = this.get('/statistics');

  public getAuthInfo = this.get('/auth/info');

  public newArticle = this.post('/articles');

  public getArticleList = this.get('/articles');

  public getArticleDetail = (articleId: string) => this.get(`/articles/${articleId}`);

  public likeArticle = (articleId: string) => this.post(`/articles/${articleId}/like`);

  public updateArticle = (articleId: string) => this.patch(`/articles/${articleId}`);

  public deleteArticle = (articleId: string) => this.delete(`/articles/${articleId}`);

  public newCategory = this.post('/categories');

  public getCategoryList = this.get('/categories');

  public getCategoryDetail = (categoryId: string) => this.get(`/categories/${categoryId}`);

  public updateCategory = (categoryId: string) => this.patch(`/categories/${categoryId}`);

  public deleteCategory = (categoryId: string) => this.delete(`/categories/${categoryId}`);

  public newTag = this.post('/tags');

  public getTagList = this.get('/tags');

  public getTagDetail = (tagId: string) => this.get(`/tags/${tagId}`);

  public updateTag = (tagId: string) => this.patch(`/tags/${tagId}`);

  public deleteTag = (tagId: string) => this.delete(`/tags/${tagId}`);

  public getOption = this.get('/options');

  public updateOption = this.patch('/options');

  public getUserList = this.get('/users');

  public getUserDetail = (userId: string) => this.get(`/users/${userId}`);

  public updateUser = (userId: string) => this.patch(`/users/${userId}`);

  public deleteUser = (userId: string) => this.delete(`/users/${userId}`);

  public getMusicList = this.get('/music/songs');
  
  public getMomentList = this.get('/moment');

  public getMomentDetail = (momentId: string) => this.get(`/moment/${momentId}`);

  public updateMoment = (momentId: string) => this.patch(`/moment/${momentId}`);

  public deleteMoment = (momentId: string) => this.delete(`/moment/${momentId}`);

  public getNotificationList = this.get('/notifications')

  public getNotificationUnviewedCount = this.get('/notifications/count')

  public viewNotification = (notificationId: string) => this.post(`/notifications/${notificationId}/view`)

  public viewAllNotification = this.post('/notifications/viewall')

  public deleteNotification = (notificationId: string) => this.delete(`/notifications/${notificationId}`)

  public getAliyunCredential = this.get('/aliyun/oss');

  /**
   * 阿里云
   */

  private getAliyunClient () {
    if (this._aliyunClient && this._aliyunClient instanceof OSS.Wrapper) return Promise.resolve();
    return this.getAliyunCredential().then(res => {
      if (res.success && res.data) {
        this._aliyunClient = new OSS.Wrapper(res.data);
      }
    });
  }

  public multipartUpload (name: string, file, options?: any) {
    return this.getAliyunClient()
      .then(() => this._aliyunClient.multipartUpload(name, file, Object.assign({}, options)))
      .then(res => {
        return {
          url: res.res.requestUrls[0].replace(`http://${this._aliyunClient.options.bucket}.${this._aliyunClient.options.region}.aliyuncs.com`, 'https://static.jooger.me') || ''
        };
      });
  }
}
