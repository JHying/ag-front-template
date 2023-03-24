import { Component, OnInit } from '@angular/core';
import { SysCode } from 'src/app/interface/syscode';

import { Role } from './../../interface/role';
import { UserInfo } from './../../interface/user';

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {
  userInfo: UserInfo;

  constructor() {
    this.userInfo =
      sessionStorage.getItem(SysCode.user_key) != null
        ? JSON.parse(sessionStorage.getItem(SysCode.user_key))
        : null;
  }

  ngOnInit(): void {
    this.transferRole();
  }

  transferRole() {
    let newRoles = this.userInfo.roles.map((role) => Role[role]);
    this.userInfo.roles = newRoles;
  }
}
