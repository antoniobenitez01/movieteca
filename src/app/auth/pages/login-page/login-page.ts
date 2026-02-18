import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone : false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPageComponent {

  loginForm : FormGroup;
  titulo = "MOVIETECA";
  showSpinner : boolean = false;

  step: 'email' | 'checking' | 'password' = 'email';

  emailError: string = '';

  constructor(
    private authService : AuthService,
    private router : Router,
    private snackbar : MatSnackBar
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.showSpinner = true;
    this.step = 'checking';

    setTimeout(() => {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.showSpinner = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.showSpinner = false;
          this.goBackToEmail();
          this.snackbar.open('Credenciales inválidas, inténtelo de nuevo.', 'Cerrar', { duration: 3000 });
        }
      });
    }, 2000);
  }

  validateEmail(): void {
    const usernameControl = this.loginForm.get('username')!;
    usernameControl.markAsTouched();

    if (!usernameControl.valid) {
      this.emailError = 'Por favor introduce un correo electrónico válido.';
      return;
    }

    this.emailError = '';
    this.step = 'checking';

    setTimeout(() => {
      this.step = 'password';
    }, 1000);
  }

  goBackToEmail(): void {
    this.step = 'email';
    this.loginForm.get('password')?.reset();
  }

  get isEmailInvalid(): boolean {
    const ctrl = this.loginForm.get('username')!;
    return ctrl.invalid && ctrl.touched;
  }
}
