import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guard/auth.guard';
import { PersonalComponent } from '../pages/personal/personal.component';

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  {
    path: "profile",
    component: PersonalComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "prescription/manage",
  //   component: RxManageComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: "", component: AddRxComponent },
  //     { path: "", component: EditRxComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
