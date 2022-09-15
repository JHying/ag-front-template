import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenWhiteList } from "../interface/common";
import { SysCode } from "../interface/syscode";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(SysCode.token_key);
    const isWhiteList = new TokenWhiteList().urls.some((url) =>
      req.url.includes(url)
    );

    if (isWhiteList) {
      return next.handle(req);
    } else if (token) {
      let userInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          USER_ID: `${userInfo.userId}`,
        },
      });
      return next.handle(req);
    } else {
      console.log("Auth Error.");
      this._router.navigateByUrl("login");
    }
  }
}
