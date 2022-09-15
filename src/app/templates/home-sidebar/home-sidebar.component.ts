import { Component, OnInit } from "@angular/core";
import { MatDrawerToggleResult, MatSidenav } from "@angular/material/sidenav";
import { Observable, of } from "rxjs";
import { ResponseObj } from "src/app/interface/common";
import { JwtUser } from "src/app/interface/user";
import { SideNavObj } from "./../../interface/common";
import { SysCode } from "./../../interface/syscode";
import { CommonService } from "./../../service/common.service";
import { LoginService } from "./../../service/login.service";
import { BaseComponent } from "./../base/base.component";

@Component({
  selector: "app-home-sidebar",
  templateUrl: "./home-sidebar.component.html",
  styleUrls: ["./home-sidebar.component.css"],
  providers: [CommonService, LoginService],
})
export class HomeSidebarComponent extends BaseComponent implements OnInit {
  status: MatDrawerToggleResult;
  sideNavList$: Observable<SideNavObj[]>;

  constructor(
    private commonService: CommonService,
    private loginService: LoginService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSideNav();
    this.initToken();
  }

  getSideNavStatus(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      this.status = result;
    });
  }

  initSideNav() {
    let userInfo = JSON.parse(sessionStorage.getItem(SysCode.user_key));
    this.commonService
      .getSideNav(userInfo)
      .pipe(super.takeUntilDestroy())
      .subscribe((data: ResponseObj) => {
        this.sideNavList$ = of(<SideNavObj[]>data.result);
      });
  }

  initToken() {
    this.loginService
      .updateToken(new JwtUser())
      .pipe(super.takeUntilDestroy())
      .subscribe((data: ResponseObj) => {
        //儲存 token 以利後續使用
        sessionStorage.setItem(SysCode.token_key, data.result);
      });
  }
}
