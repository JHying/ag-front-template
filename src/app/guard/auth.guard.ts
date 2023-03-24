import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SysCode } from '../interface/syscode';
import { UserInfo } from '../interface/user';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  //return true 才可以訪問該頁面
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url = `${next.url}`;
    return this.auth(url);
  }

  auth(url: string): boolean {
    if (!this.isLogin()) {
      this.router.navigate(["login"]);
      return false;
    } else {
      return this.checkUrl(url);
    }
  }

  isLogin() {
    return sessionStorage.getItem(SysCode.user_key) !== null;
  }

  checkUrl(url: string): boolean {
    let userInfo: UserInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
    let authUrls: string[] = userInfo.urls;
    return authUrls.includes(url.replace(',', '/'));// 在 url 中 main/profile 會變成 main,profile
  }
}
