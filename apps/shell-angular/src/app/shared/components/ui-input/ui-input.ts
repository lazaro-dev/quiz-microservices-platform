import {
	Component,
	computed,
	forwardRef,
	input,
	signal,
} from '@angular/core';

import {
	AbstractControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-ui-input',
	standalone: true,
	templateUrl: './ui-input.html',
	styleUrl: './ui-input.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UiInput),
			multi: true,
		},
	],
})
export class UiInput implements ControlValueAccessor {

	readonly label = input('');
	readonly placeholder = input('');

	readonly type = input<
		'text' |
		'email' |
		'password'
	>('text');

	readonly size = input<
		'sm' |
		'md' |
		'lg'
	>('md');

	readonly control = input<AbstractControl | null>(null);

	readonly showPasswordToggle = input(false);

	readonly passwordVisible = signal(false);

	value = '';

	disabled = false;

	get errorMessage(): string {
		const control = this.control();

		if (
			!control ||
			!control.touched ||
			!control.errors
		) {
			return '';
		}

		if (control.errors['required']) {
			return 'Campo obrigatório';
		}

		if (control.errors['email']) {
			return 'E-mail inválido';
		}

		if (control.errors['minlength']) {
			const requiredLength = control.errors['minlength'].requiredLength;

			return `Mínimo de ${requiredLength} caracteres`;
		}

		if (control.errors['maxlength']) {
			const requiredLength = control.errors['maxlength'].requiredLength;

			return `Máximo de ${requiredLength} caracteres`;
		}

		return 'Campo inválido';
	};

	get inputType(): string {
		if (this.type() !== 'password') {
			return this.type();
		}

		return this.passwordVisible()
			? 'text'
			: 'password';
	}

	togglePassword(): void {
		this.passwordVisible.update(value => !value,);
	}

	private onChange: (value: string) => void = () => { };

	private onTouched: () => void = () => { };

	writeValue(value: string,): void {
		this.value = value ?? '';
	}

	registerOnChange(fn: (value: string) => void,): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void,): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean,): void {
		this.disabled = isDisabled;
	}

	handleInput(event: Event,): void {

		const target = event.target as HTMLInputElement;

		this.value = target.value;

		this.onChange(target.value,);
	}

	handleBlur(): void {
		this.onTouched();
	}
}