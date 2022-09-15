import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, of, pipe } from "rxjs";
import { catchError, delay, map } from "rxjs/operators";
import { ResponseObj } from "src/app/interface/common";

const OPTIONS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
  withCredentials: false,
};

// 使Service成為可被注入的元件
@Injectable({
  // 請把我註冊在整個系統都是使用同一個實體的注射器裡
  // 整個系統就只只會有一個實體，類似 Singleton 的概念
  // 如果這個 Service 在整個 Angular 的生命週期裡都沒有被使用到，
  // Angular 在編譯的時候，會透過 Tree-Shaking 機制把這個 Service 剔除
  providedIn: "root",
})
export class HttpClientService {
  // 注入 HttpClient 到 service
  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Observable負責產生資料，創建後不會馬上啟動，須待_關注(subscribe)後開始啟動_。
   */
  public httpPost(url, JSONobj): Observable<ResponseObj> {
    return this.httpClient
      .post(url, JSONobj, OPTIONS)
      .pipe(this.httpPipeLogic());
  }
  public httpPut(url, JSONobj): Observable<ResponseObj> {
    return this.httpClient
      .put(url, JSONobj, OPTIONS)
      .pipe(this.httpPipeLogic());
  }
  public httpGet(url): Observable<ResponseObj> {
    return this.httpClient.get(url, OPTIONS).pipe(this.httpPipeLogic());
  }
  public httpDownloadFile(url): Observable<any> {
    return this.httpClient.get(url, {
      responseType: "blob",
      observe: "response",
    });
  }
  public httpGetToBlob(url): Observable<any> {
    return this.httpClient.get(url, { responseType: "blob" as "json" });
  }
  public httpPatch(url, JSONobj): Observable<ResponseObj> {
    return this.httpClient
      .patch(url, JSONobj, OPTIONS)
      .pipe(this.httpPipeLogic());
  }
  public httpDelete(url): Observable<ResponseObj> {
    return this.httpClient.delete(url, OPTIONS).pipe(this.httpPipeLogic());
  }
  public httpDeleteWithBody(url, JSONobj): Observable<ResponseObj> {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: JSONobj,
    };
    return this.httpClient.delete(url, options).pipe(this.httpPipeLogic());
  }

  private httpPipeLogic = () =>
    pipe(
      delay(100),
      map((data: any) => {
        if (data.status !== "OK") {
          return this.createErrorObj(data);
        } else {
          return data;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log("ERROR OCCURRED.");
        console.log(err.message);
        if (err.status === 401 || err.status === 403) {
          this.snackBar.open("認證已過期, 請重新登入", "OK", {
            duration: 5 * 1000,
          });
        } else {
          this.snackBar.open("發生錯誤, 請洽系統客服", "OK", {
            duration: 5 * 1000,
          });
        }
        this._router.navigateByUrl("login");
        return null;
      })
    );

  /**
   * 處理http發生的錯誤，讓程式可以繼續正確的運作而不產生exception
   * 這可以讓程式在打api失敗時可取得符合應用程式期望類型的回傳值。
   */
  private handleError(error?: any): Observable<ResponseObj> {
    return of<ResponseObj>(this.createErrorObj(error));
  }

  private createErrorObj(error?: any): ResponseObj {
    return {
      status: error && error.status ? error.status : "INTERNAL ERROR",
      errors:
        error && error.errors
          ? error.errors
          : ["This is a message from handleError.", "Request failed."],
    };
  }
}
