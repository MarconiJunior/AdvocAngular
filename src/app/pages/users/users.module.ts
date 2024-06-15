import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [ UsersComponent ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class UsersRegisterModule {}
