import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "src/app/guard/auth-interceptor";
import { MsgBoxComponent } from "src/app/templates/msg-box/msg-box.component";
import { PersonalComponent } from "../pages/personal/personal.component";
import { MainRoutingModule } from "./main-routing.module";
import { ShareModule } from "./share.module";

@NgModule({
  declarations: [
    MsgBoxComponent,
    PersonalComponent,
  ],
  imports: [CommonModule, ShareModule, MainRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], //註冊token攔截器
  entryComponents: [
    MsgBoxComponent
  ],
})
export class MainModule {}
