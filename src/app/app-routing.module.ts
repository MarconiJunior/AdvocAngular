import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/AuthGuard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: "user-register",
    loadChildren: () => import("./register-user/register-user.module").then(m => m.RegisterUserModule)
  },
  {
    path: "",
    canActivateChild: [ AuthGuard ],
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
