import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function required(control: AbstractControl): Error | null {
  return Validators.required(control)
    ? { message: 'The field is required' }
    : null;
}

export function minLength(min: number): ValidatorFn {
  const validatorFn = Validators.minLength(min);
  return (control: AbstractControl) => {
    return validatorFn(control)
      ? { message: `No mínimo ${min} caractéres no campo` }
      : null;
  };
}

export function maxLength(max: number): ValidatorFn {
  const validatorFn = Validators.maxLength(max);
  return (control: AbstractControl) => {
    return validatorFn(control)
      ? { message: `No máximo ${max} caractéres no campo` }
      : null;
  };
}

export function pattern(
  pattern: string | RegExp,
  errorMessage: string
): ValidatorFn {
  const validatorFn = Validators.pattern(pattern);
  return (control: AbstractControl) => {
    return validatorFn(control) ? { message: errorMessage } : null;
  };
}

export function confirmedPassword(control: AbstractControl): Error | null {
  return control.parent?.get('password')?.value === control.value
    ? null
    : { message: 'Senhas não coincidem' };
}

interface Error {
  message: string;
}
