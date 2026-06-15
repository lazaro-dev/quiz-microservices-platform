import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

export interface ToastOptions {
    title?: string;
    duration?: number;
    dismissible?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    success(message: string, options?: ToastOptions,): void {

        toast.success(
            options?.title ?? message,
            {
                description: options?.title
                    ? message
                    : undefined,
                duration: options?.duration ?? 4000,
                dismissible: options?.dismissible ?? true,
            },
        );
    }

    error(message: string, options?: ToastOptions,): void {

        toast.error(
            options?.title ?? message,
            {
                description: options?.title
                    ? message
                    : undefined,
                duration: options?.duration ?? 4000,
                dismissible: options?.dismissible ?? true,
            },
        );
    }

    warning(message: string, options?: ToastOptions,): void {

        toast.warning(
            options?.title ?? message,
            {
                description: options?.title
                    ? message
                    : undefined,
                duration: options?.duration ?? 4000,
                dismissible: options?.dismissible ?? true,
            },
        );
    }

    info(message: string, options?: ToastOptions,): void {

        toast.info(
            options?.title ?? message,
            {
                description: options?.title
                    ? message
                    : undefined,
                duration: options?.duration ?? 4000,
                dismissible: options?.dismissible ?? true,
            },
        );
    }
}