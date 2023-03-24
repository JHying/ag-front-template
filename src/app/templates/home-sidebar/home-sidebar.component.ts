import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FileSaverDirective } from 'ngx-filesaver';
import { SideNavObj, UserInfo } from 'src/app/interface/user';

import tokenData from './../../interface/mock-data/token.json';
import { SysCode } from './../../interface/syscode';
import { LoginService } from './../../service/login.service';
import { BaseComponent } from './../base/base.component';

@Component({
  selector: "app-home-sidebar",
  templateUrl: "./home-sidebar.component.html",
  styleUrls: ["./home-sidebar.component.css"],
  providers: [LoginService, FileSaverDirective],
})
export class HomeSidebarComponent extends BaseComponent implements OnInit {
  status: MatDrawerToggleResult;
  sideNavList: SideNavObj[];
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    // private fileSaverService: FileSaverService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSideNav();
    this.initToken();
    //防止 sessionStorage 被竄改
    window.addEventListener('storage', function (e) {
      this.sessionStorage.setItem(e.key, e.oldValue);
    });
  }

  getSideNavStatus(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      this.status = result;
    });
  }

  checkRouterUrl(url: string) {
    return this.router.url.includes(url);
  }

  initSideNav() {
    let userInfo: UserInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
    this.sideNavList = userInfo.sideNavObjs;
  }

  initToken() {
    // this.loginService
    //   .updateToken(new JwtUser())
    //   .pipe(super.takeUntilDestroy())
    //   .subscribe((data: ResponseObj) => {
    //     //儲存 token 以利後續使用
    //     sessionStorage.setItem(SysCode.token_key, data.result);
    //   });
    sessionStorage.setItem(SysCode.token_key, tokenData.result);//先用假資料
  }

  // downloadCourse() {
  //   this.loading = true;
  //   this.fileService
  //     .getCourseReport()
  //     .pipe(super.takeUntilDestroy())
  //     .subscribe((data) => {
  //       var blob = new Blob([data.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  //       this.fileSaverService.save(blob, '運動紀錄.xlsx');
  //       this.loading = false;
  //     });
  // }

}
