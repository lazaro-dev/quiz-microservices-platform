import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../features/home/home')
            .then((m) => m.Home),
    },
    {
        path: 'quiz/:slug',
        loadComponent: () =>
            import('../features/quiz-details/quiz-details')
                .then(m => m.QuizDetails),
    },
    // {
    //     path: 'perfil',
    //     loadComponent: () =>
    //       import('../features/profile/profile')
    //         .then(m => m.Profile),
    //   },
    //   {
    //     path: 'placares',
    //     loadComponent: () =>
    //       import('../features/leaderboard/leaderboard')
    //         .then(m => m.Leaderboard),
    //   },
];
