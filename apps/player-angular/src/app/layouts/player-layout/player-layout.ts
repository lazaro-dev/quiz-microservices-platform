import { Header } from '@/app/shared/header/header';
import { Component } from '@angular/core';

@Component({
  selector: 'app-player-layout',
  imports: [
    Header,
  ],
  templateUrl: './player-layout.html',
  styleUrl: './player-layout.scss',
})
export class PlayerLayout {}
