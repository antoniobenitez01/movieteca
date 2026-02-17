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
  loginError: string = '';

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
    this.loginError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.showSpinner = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.showSpinner = false;
        this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
        this.snackbar.open('Error al iniciar sesión', 'Cerrar', { duration: 3000 });
      }
    });
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
    }, 800);
  }

  goBackToEmail(): void {
    this.step = 'email';
    this.loginError = '';
    this.loginForm.get('password')?.reset();
  }

  get isEmailInvalid(): boolean {
    const ctrl = this.loginForm.get('username')!;
    return ctrl.invalid && ctrl.touched;
  }
}
