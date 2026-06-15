import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { UiInput } from '@shared/components/ui-input/ui-input';
import { UiButton } from '@shared/components/ui-button/ui-button';
import { UiCard } from '@shared/components/ui-card/ui-card';

import { AuthService } from '@core/services/auth.service';
import { SessionService } from '@core/services/session.service';
import { AuthLayout } from '@/app/layouts/auth-layout/auth-layout';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiInput,
    UiButton,
    UiCard,
    AuthLayout,
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly sessionService = inject(SessionService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ],
    ),
    password: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ],
    ),
  });


  async submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    try {
      this.loading.set(true);

      const response = await firstValueFrom(
        this.authService.login(
          this.form.getRawValue(),
        ),
      );

      this.sessionService.saveToken(response.token);

      const user = await firstValueFrom(this.authService.me());

      this.sessionService.saveUser(user);

      this.toastService.success('Login realizado com sucesso',);

      await this.router.navigate(['/app']);

    } catch (error) {
      this.toastService.error('Usuário ou senha inválidos',);
    } finally {
      this.loading.set(false);
    }
  }

  toRegister() {
    this.router.navigate(['/cadastro']);
  }

  toForgotPassword() {
    this.router.navigate(['/esqueci-minha-senha']);
  }
}