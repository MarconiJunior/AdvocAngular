import { NgModule } from "@angular/core";
import { RegisterUserComponent } from "./register-user.component";
import { RegisterUserRoutingModule } from "./register-user-routing.module";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ RegisterUserComponent ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterUserModule {}
