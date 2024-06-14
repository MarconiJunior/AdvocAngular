import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [ ClientsComponent ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class ClientsRegisterModule {}
