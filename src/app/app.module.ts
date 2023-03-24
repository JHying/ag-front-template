import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './guard/auth-interceptor';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderToolbarComponent } from './templates/header-toolbar/header-toolbar.component';
import { HomeSidebarComponent } from './templates/home-sidebar/home-sidebar.component';
import { MainComponent } from './templates/main/main.component';
import { PwaInstallComponent } from './templates/pwa-install/pwa-install.component';
import { ShareModule } from './templates/share.module';

//全域導入的模組套件 (先導入基本組件即可)
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderToolbarComponent,
    HomeSidebarComponent,
    LoginComponent,
    MainComponent,
    PwaInstallComponent
  ],
  imports: [
    // 使用angular 自帶的常用指令，像*ngFor、ngClass等
    CommonModule,
    // 使用angular 裡面路由常用指令，像[routerLink]、routerLinkActive等
    RouterModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
    //註冊pwa使用的service worker (該檔案只有 build 完才會出現 -- prod 環境)
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  // 請把我註冊在這整個 NgModule 都用同一個實體的注射器裡
  // 整個 NgModule 裡都會使用同一個實體
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],//註冊token攔截器
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
