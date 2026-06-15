import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'entrar',
        pathMatch: 'full',
    },
    {
        path: 'entrar',
        loadComponent: () =>
            import('./features/auth/login/login')
                .then(m => m.Login),
    },
    {
        path: 'cadastro',
        loadComponent: () =>
            import('./features/auth/register/register')
                .then(m => m.Register),
    },
    {
        path: 'esqueci-minha-senha',
        loadComponent: () =>
            import('./features/auth/forgot-password/forgot-password')
                .then(m => m.ForgotPassword),
    },
    {
        path: 'app',
        canActivate: [authGuard],
        loadComponent: () =>
            import(
                './features/app/dashboard/dashboard'
            ).then(m => m.Dashboard),
    },
];
