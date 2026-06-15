import { AuthService } from '@/app/core/services/auth.service';
import { SessionService } from '@/app/core/services/session.service';
import { ToastService } from '@/app/core/services/toast.service';
import { AuthLayout } from '@/app/layouts/auth-layout/auth-layout';
import { UiButton } from '@/app/shared/components/ui-button/ui-button';
import { UiCard } from '@/app/shared/components/ui-card/ui-card';
import { UiInput } from '@/app/shared/components/ui-input/ui-input';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    UiInput,
    UiButton,
    UiCard,
    AuthLayout,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly sessionService = inject(SessionService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ],
    ),

    email: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ),

    password: this.fb.nonNullable.control(
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ),

    confirmPassword: this.fb.nonNullable.control(
      '',
      Validators.required,
    ),
  });


  async submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const { password, confirmPassword, } = this.form.getRawValue();

    if (password !== confirmPassword) {
      this.toastService.error('As senhas não coincidem');
      return;
    }

    try {
      this.loading.set(true);

      const { username, email, password } = this.form.getRawValue();

      const response = await firstValueFrom(
        this.authService.register({
          username,
          email,
          password,
        })
      );

      this.sessionService.saveToken(response.token);

      const user = await firstValueFrom(
        this.authService.me()
      );

      this.sessionService.saveUser(user);

      this.toastService.success('Conta criada com sucesso');

      await this.router.navigate(['/app']);

    } catch (error) {
      this.toastService.error('Não foi possível criar a conta');
    } finally {
      this.loading.set(false);
    }
  }

  toLogin() {
    this.router.navigate(['/entrar']);
  }
}
