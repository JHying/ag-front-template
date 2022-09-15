import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../app.config";
import { ResponseObj } from "../interface/common";
import { UserInfo } from "../interface/user";
import { HttpClientService } from "./httpclient.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {

  constructor(private httpserv: HttpClientService) {;
  }

  public getSideNav(userInfo: UserInfo): Observable<ResponseObj> {
    return this.httpserv.httpPost(config.sideNavUrl, userInfo);
  }

}
