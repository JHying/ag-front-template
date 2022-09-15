import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../app.config";
import { ResponseObj } from "../interface/common";
import { HttpClientService } from "./httpclient.service";

@Injectable()
export class TestService {
  constructor(private httpserv: HttpClientService) {}

  public testApi(): Observable<ResponseObj> {
    return this.httpserv.httpGet(config.testUrl);
  }

}
