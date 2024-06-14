import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsRegisterComponent } from './clients-register.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsRegisterComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRegisterRoutingModule {}
