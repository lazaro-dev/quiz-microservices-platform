import { Component, input } from '@angular/core';

@Component({
    selector: 'app-ui-button',
    standalone: true,
    templateUrl: './ui-button.html',
    styleUrl: './ui-button.scss',
})
export class UiButton {
    readonly variant = input<
        'primary' |
        'success' |
        'danger' |
        'warning'
    >('primary');

    readonly size = input<
        'sm' |
        'md' |
        'lg'
    >('md');

    readonly loading = input(false);
    readonly disabled = input(false);

    readonly type = input<
        'button' |
        'submit'
    >('button');
}