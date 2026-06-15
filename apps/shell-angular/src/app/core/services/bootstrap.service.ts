import { inject, Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  private readonly authService = inject(AuthService);

  private readonly sessionService = inject(SessionService);

  async initialize(): Promise<void> {
    const token = this.sessionService.getToken();

    if (!token) {
      return;
    }

    try {
      const user = await firstValueFrom(
        this.authService.me()
      );

      this.sessionService.saveUser(user);
    } catch {
      this.sessionService.clear();
    }
  }
}