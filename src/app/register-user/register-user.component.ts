import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserModel } from "../../models/user.model";

import { confirmedPassword, maxLength, minLength, pattern, required } from "../../utils/validator";
import { Subscription } from "rxjs";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrl: "./register-user.component.scss"
})
export class RegisterUserComponent implements OnDestroy {
  subscription = new Subscription();
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [ "", [ required, minLength(3), maxLength(50) ] ],
      email: [
        "",
        [
          required,
          pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
            "Email inválido"
          )
        ]
      ],
      oabSerial: [ "", [ required, minLength(3), maxLength(20) ] ],
      phone: [ "", [ required, pattern("^\\+?[1-9]\\d{1,14}$", "Telefone inválido") ] ],
      password: [ "", [ required, minLength(6) ] ],
      confirmPassword: [ "", [ required, confirmedPassword ] ]
    });

    this.subscription.add(
      this.registerForm.get("password")?.valueChanges.subscribe(() => {
        this.registerForm.get("confirmPassword")?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const model: UserModel = {
        name: this.registerForm.get("name")?.value,
        email: this.registerForm.get("email")?.value,
        oabSerial: this.registerForm.get("oabSerial")?.value,
        phone: this.registerForm.get("phone")?.value,
        password: this.registerForm.get("password")?.value
      };
      this.userService
        .create(model)
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

  openLoginPage(): void {
    this.router.navigate([ "/login" ]);
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    return control?.errors?.["message"];
  }
}
