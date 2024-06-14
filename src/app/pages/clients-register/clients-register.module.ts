import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ClientsRegisterComponent } from "./clients-register.component";
import { ClientsRegisterRoutingModule } from "./clients-register-routing.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from "@angular/material/core";

@NgModule({
  declarations: [ ClientsRegisterComponent ],
  imports: [
    CommonModule,
    ClientsRegisterRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    provideNativeDateAdapter(),
    DatePipe
  ]
})
export class ClientsRegisterModule {}
