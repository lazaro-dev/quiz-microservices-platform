import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { loadRemoteStyle } from '@core/utils/load-remote-style';
import { remotes } from './core/configs/remotes.config';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'player',
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
    // {
    //     path: 'player',
    //     loadChildren: () =>
    //         loadRemoteModule({
    //             type: 'module',
    //             remoteEntry:
    //                 'http://localhost:4201/remoteEntry.js',
    //             exposedModule: './Routes',
    //         }).then(m => m.routes)
    //             .catch(err => {
    //                 console.error(err);
    //                 throw err;
    //             }),
    // }
    {
        path: 'player',
        loadChildren: async () => {

            loadRemoteStyle(
                remotes.player.styles
            );

            const remote = await loadRemoteModule({
                type: 'module',
                remoteEntry: remotes.player.remoteEntry,
                exposedModule: './Routes',
            });

            return remote.routes;
        },
    }
];
