import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { LoginService } from "src/app/service/login.service";
import { BaseComponent } from "src/app/templates/base/base.component";
import { ResponseObj } from "./../../interface/common";
import { SysCode } from "./../../interface/syscode";
import { UserInfo } from "./../../interface/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [LoginService],
})
export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    super();
  }

  ngOnInit() {
    sessionStorage.clear();
    this.createLoginForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  createLoginForm() {
    this.form = this.fb.group({
      userId: ["testAdmin", Validators.required],
      userPW: ["test123", Validators.required],
      // rememberMe: [true],
    });
  }

  login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    //連線後端登入
    this.loading = true;
    this.loginService
      .login(this.form.value)
      .pipe(super.takeUntilDestroy())
      .subscribe((data: ResponseObj) => {
        sessionStorage.setItem(SysCode.user_key, JSON.stringify(data.result));
        //初始化有權限的 url 清單
        this.initAuthUrl(data.result);
        this.loading = false;
      });
  }

  initAuthUrl(userInfo: UserInfo) {
    this.loginService
      .getRoleAuthPages(userInfo)
      .pipe(
        super.takeUntilDestroy(),
        map((data: ResponseObj) => data.result)
      )
      .subscribe((data: string[]) => {
        //儲存 url 以利後續使用
        sessionStorage.setItem(SysCode.url_key, JSON.stringify(data));
        this.router.navigateByUrl("main");
      });
  }
}
