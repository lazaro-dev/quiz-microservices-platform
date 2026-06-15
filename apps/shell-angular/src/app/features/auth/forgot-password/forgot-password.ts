

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
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    UiInput,
    UiButton,
    UiCard,
    AuthLayout,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
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
  });


  async submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.toastService.warning('Funcionalidade em desenvolvimento!');
  }

  toRegister() {
    this.router.navigate(['/cadastro']);
  }

  toLogin() {
    this.router.navigate(['/entrar']);
  }
}