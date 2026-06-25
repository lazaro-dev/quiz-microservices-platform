import {
  Component,
  HostListener,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.html',
})
export class Header {

  readonly mobileMenuOpen = signal(false);

  readonly profileMenuOpen = signal(false);

  toggleMenu(): void {
    this.mobileMenuOpen.update(
      value => !value,
    );
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen.update(
      value => !value,
    );
  }

  logout(): void {
    console.log('logout');
  }

  @HostListener('document:click')
  closeMenus(): void {
    this.profileMenuOpen.set(false);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}