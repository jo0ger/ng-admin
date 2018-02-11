import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
         HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
       } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { environment } from '@env/environment';

const enum CODE_MAP {
  FAILED = -1,
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  PARAMS_ERROR = 10001
}

/**
 * 默认HTTP拦截器，其注册细节见 `core.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {}

  get msg(): NzMessageService {
      return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    // TODO 保存当前URL，登录后跳转该URL
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleResponse(res: HttpResponse<any>, req: HttpRequest<any>): Observable<any> {
      // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
      this.injector.get(_HttpClient).end();
      const body: any = res.body;
      if (!body) {
        this.msg.error('服务器异常');
        return ErrorObservable.throw(res);
      }
      switch (body.code) {
        case CODE_MAP.UNAUTHORIZED:
          this.handleUnauth();
          break;
        case CODE_MAP.FAILED:
        case CODE_MAP.FORBIDDEN:
        case CODE_MAP.SERVER_ERROR:
        case CODE_MAP.PARAMS_ERROR:
          this.msg.error(body.message);
          // TODO 跳转错误页面
          break;
        case CODE_MAP.SUCCESS:
          if (req.method.toUpperCase() !== 'GET') {
            this.msg.success(body.message || '操作成功');
          }
          break;
        default:
          break;
      }
      return of(res);
  }

  handleError (err: HttpErrorResponse): Observable<any> {
    this.injector.get(_HttpClient).end();
    if (err.status === CODE_MAP.UNAUTHORIZED) {
      this.handleUnauth();
    } else {
      const status = err.status;
      const message = `请求错误${status ? `，code:${status}` : ''}`;
      this.msg.error(message);
    }
    return of(err);
  }

  handleUnauth () {
    this.msg.error('请先登录')
    this.tokenService.clear()
    this.goTo(this.tokenService.login_url)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

      // 统一加上服务端前缀
      let url = req.url;
      if (!url.startsWith('https://') && !url.startsWith('http://')) {
          url = `${environment.SERVER_URL}${url}`;
      }

      const newReq = req.clone({
          url: url
      });
      return next.handle(newReq).pipe(
        mergeMap((event: any) => {
            // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
            if (event instanceof HttpResponse && event.status === 200)
                return this.handleResponse(event, req);
            // 若一切都正常，则后续操作
            return of(event);
        }),
        catchError((err: HttpErrorResponse) => this.handleError(err))
      );;
  }
}
