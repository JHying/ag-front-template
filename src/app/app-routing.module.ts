import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeSidebarComponent } from './templates/home-sidebar/home-sidebar.component';

const routes: Routes = [
  //首頁路由到 login
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
  },
  //loadChildren: 路由至該頁面時，再載入相關模組
  {
    path: "main",
    component: HomeSidebarComponent,
    loadChildren: () => import('./templates/main.module').then(mod=>mod.MainModule) //Lazy Loading
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: "reload", // 同樣 url 時還是進行 reload
      scrollPositionRestoration: "top",
      preloadingStrategy: PreloadAllModules, // loading時先顯示第一個頁面，再繼續prepload其他 (解決效能問題)
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
