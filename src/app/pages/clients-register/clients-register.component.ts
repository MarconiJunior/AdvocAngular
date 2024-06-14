import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientsService } from "../../services/clients.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ClientModel } from "../../../models/client.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-clients-register",
  templateUrl: "./clients-register.component.html",
  styleUrl: "./clients-register.component.scss"
})
export class ClientsRegisterComponent {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.registerForm = fb.group({
      birthday: [ "", Validators.required ],
      city: [ "", Validators.required ],
      cpf: [ "", Validators.required ],
      email: [ "", Validators.required ],
      clientName: [ "", Validators.required ],
      neighborhood: [ "", Validators.required ],
      road: [ "", Validators.required ]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formattedDate = this.datePipe.transform(this.registerForm.get("birthday")?.value, "dd/MM/yyyy");
      const model: ClientModel = {
        name: this.registerForm.get("clientName")?.value,
        email: this.registerForm.get("email")?.value,
        birthday: formattedDate ? formattedDate : "",
        cpf: this.registerForm.get("cpf")?.value,
        road: this.registerForm.get("road")?.value,
        neighborhood: this.registerForm.get("neighborhood")?.value,
        city: this.registerForm.get("city")?.value
      };
      this.clientsService
        .register(model)
        .then(() => {
          this.snackBar.open("Cadastro realizado com sucesso", "Close", {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 2000,
            panelClass: [ "snackbar-success" ]
          });
          this.router.navigate([ "clients" ]);
        })
        .catch((e) => {
          this.snackBar.open(e.error?.message, "Close", {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 2000,
            panelClass: [ "snackbar-error" ]
          });
        });
    } else {
      this.snackBar.open("Formulário inválido", "Close", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 2000,
        panelClass: [ "snackbar-error" ]
      });
    }
  }
}
