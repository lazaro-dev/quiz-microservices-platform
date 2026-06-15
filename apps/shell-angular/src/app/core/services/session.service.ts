import { Injectable } from '@angular/core';

import { User } from '@core/models/user.model';

import { StorageKeys } from '@core/constants/storage-keys';

import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(private readonly storage: StorageService,) { }

  saveToken(token: string): void {
    this.storage.set(
      StorageKeys.TOKEN,
      token,
    );
  }

  getToken(): string | null {
    return this.storage.get<string>(
      StorageKeys.TOKEN,
    );
  }

  saveUser(user: User): void {
    this.storage.set(
      StorageKeys.USER,
      user,
    );
  }

  getUser(): User | null {
    return this.storage.get<User>(StorageKeys.USER);
  }

  clear(): void {
    this.storage.remove(StorageKeys.TOKEN);

    this.storage.remove(StorageKeys.USER);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}