import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { BaseComponent } from 'src/app/templates/base/base.component';

import loginInfo from './../../interface/mock-data/loginInfo.json';
import { SysCode } from './../../interface/syscode';

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
      userId: [null, Validators.required],
      userPW: [null, Validators.required],
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
    // this.loginService
    //   .login(this.form.value)
    //   .pipe(super.takeUntilDestroy())
    //   .subscribe((data: ResponseObj) => {
        // sessionStorage.setItem(SysCode.user_key, JSON.stringify(data.result));
        sessionStorage.setItem(SysCode.user_key, JSON.stringify(loginInfo.result));//先用假資料
        this.router.navigateByUrl("main");
      // });
    this.loading = false;
  }
}
