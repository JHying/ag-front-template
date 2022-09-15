import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ResponseObj } from "src/app/interface/common";
import { LoginService } from './../../service/login.service';
@Component({
  selector: "app-header-toolbar",
  templateUrl: "./header-toolbar.component.html",
  styleUrls: ["./header-toolbar.component.css"],
  providers: [LoginService],
})
export class HeaderToolbarComponent implements OnInit {
  loginStatus: boolean;
  responseObj$: Observable<ResponseObj>;

  constructor(private _router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.loginStatus = sessionStorage.getItem("user") !== null;
  }

  logout() {
    this.loginService.logout().subscribe(
      (data: ResponseObj) => {
        sessionStorage.clear();
        this._router.navigateByUrl("login");
      }
    );
  }

}
