import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { config } from '../app.config';
import { ResponseObj } from '../interface/common';
import { SysCode } from '../interface/syscode';
import { JwtUser, LoginReq } from '../interface/user';
import { Utils } from '../utils/utils';
import { HttpClientService } from './httpclient.service';

//成為可注入的對象 providers: UserService
@Injectable()
export class LoginService {
  constructor(private httpserv: HttpClientService) {}

  public login(loginReq: LoginReq): Observable<ResponseObj> {
    loginReq.sourceId = 2;//企業健促
    //密碼先經過RSA加密
    loginReq.userPW = Utils.rsaEncrypt(loginReq.userPW);
    return this.httpserv.httpPost(config.loginUrl, loginReq);
  }

  public logout(): Observable<ResponseObj> {
    let userInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
    return this.httpserv.httpGet(config.logoutUrl + "/" + userInfo.userId);
  }

  public updateToken(jwtUser: JwtUser): Observable<ResponseObj> {
    //更新token
    //紀錄現行使用者，密碼先經過RSA加密
    let userInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
    jwtUser.userId = userInfo.userId;
    jwtUser.authPass = Utils.rsaEncrypt(jwtUser.authPass);
    return this.httpserv.httpPost(config.jwtRegistUrl, jwtUser);
  }

}
