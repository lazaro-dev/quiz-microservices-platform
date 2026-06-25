import { Component, input } from '@angular/core';

export interface LeaderboardPlayer {
  position: number;
  username: string;
  score: number;
}
@Component({
  selector: 'app-leaderboard-card',
  imports: [],
  templateUrl: './leaderboard-card.html',
  styleUrl: './leaderboard-card.scss',
})
export class LeaderboardCard {
  readonly players = input.required<LeaderboardPlayer[]>();
}
