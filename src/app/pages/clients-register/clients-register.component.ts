import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/client.model';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrl: './clients-register.component.scss',
})
export class ClientsRegisterComponent {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = fb.group({
      birthday: ['', Validators.required],
      city: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      clientName: ['', Validators.required],
      neighborhood: ['', Validators.required],
      road: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const model: ClientModel = {
        name: this.registerForm.get('clientName')?.value,
        email: this.registerForm.get('email')?.value,
        birthday: this.registerForm.get('birthday')?.value,
        cpf: this.registerForm.get('cpf')?.value,
        road: this.registerForm.get('road')?.value,
        neighborhood: this.registerForm.get('neighborhood')?.value,
        city: this.registerForm.get('city')?.value,
      };
      this.clientsService
        .register(model)
        .then(() => {
          this.snackBar.open('Cadastro realizado com sucesso', 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['home']);
        })
        .catch((e) => {
          this.snackBar.open(e.error?.message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['snackbar-error'],
          });
        });
    } else {
      this.snackBar.open('Formulário inválido', 'Close', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
    }
  }
}
