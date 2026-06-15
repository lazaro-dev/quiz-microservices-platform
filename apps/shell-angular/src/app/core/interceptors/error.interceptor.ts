import {
    HttpErrorResponse,
    HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);

    return next(req).pipe(
        catchError(
            (error: HttpErrorResponse) => {

                switch (error.status) {

                    case 401:
                        toast.error('Sessão expirada');
                        break;

                    case 403:
                        toast.error('Acesso negado');
                        break;

                    case 500:
                        toast.error('Erro interno do servidor');
                        break;

                    default:
                        toast.error('Ocorreu um erro inesperado');
                }

                return throwError(() => error);
            }
        )
    );
};