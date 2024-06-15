import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((e) => e.HomeModule)
      },
      {
        path: "clients-register",
        loadChildren: () =>
          import("./clients-register/clients-register.module").then(
            (e) => e.ClientsRegisterModule
          )
      },
      {
        path: "clients",
        loadChildren: () => import("./clients/clients.module").then(e => e.ClientsRegisterModule)
      },
      {
        path: "users",
        loadChildren: () => import("./users/users.module").then(e => e.UsersRegisterModule)
      },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home" }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
