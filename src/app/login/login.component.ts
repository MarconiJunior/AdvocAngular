import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { LoginModel } from "../../models/login.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { required } from "../../utils/validator";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [ "", [ required, Validators.email ] ],
      password: [ "", [ required ] ]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const model: LoginModel = {
        email: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value
      };
      this.loginService
        .login(model)
        .then(() => {
          this.authService.login();
          this.snackBar.open("Login efetuado com sucesso", "Close", {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 2000,
            panelClass: [ "snackbar-success" ]
          });
          this.router.navigate([ "/" ]);
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

  onRegister(): void {
  }
}
