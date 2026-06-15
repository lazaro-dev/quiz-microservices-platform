import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@/environments/environment';

import { User } from '@core/models/user.model';

import { LoginRequest } from '@core/models/auth/login-request.model';
import { LoginResponse } from '@core/models/auth/login-response.model';
import { RegisterRequest } from '@core/models/auth/register-request.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);

    login(payload: LoginRequest) {
        return this.http.post<LoginResponse>(
            `${environment.apiUrl}/auth/login`,
            payload,
        );
    }

    register(payload: RegisterRequest) {
        return this.http.post<LoginResponse>(
            `${environment.apiUrl}/users`,
            payload,
        );
    }

    me() {
        return this.http.get<User>(
            `${environment.apiUrl}/auth/me`,
        );
    }
}