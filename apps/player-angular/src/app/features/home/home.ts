import { PlayerLayout } from '@/app/layouts/player-layout/player-layout';
import { LeaderboardCard } from '@/app/shared/leaderboard-card/leaderboard-card';
import { QuizCard } from '@/app/shared/quiz-card/quiz-card';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuizCard,
    LeaderboardCard,
    PlayerLayout,
  ],
  templateUrl: './home.html',
})
export class Home {

  readonly categories = signal([
    'Jogos',
    'Anime',
    'Filmes',
    'História',
    'Ciência',
    'Culinária',
  ]);

  readonly quizzes = signal([
    {
      id: 1,
      title: 'Você conhece Dark Souls?',
      slug: 'dark-souls',
      category: 'Jogos',
      questions: 20,
      plays: 1234,
    },
    {
      id: 2,
      title: 'Quiz Elden Ring',
      slug: 'elden-ring',
      category: 'Jogos',
      questions: 15,
      plays: 820,
    },
    {
      id: 3,
      title: 'Naruto Clássico',
      slug: 'naruto-classic',
      category: 'Anime',
      questions: 25,
      plays: 640,
    },
  ]);

  readonly leaderboard = signal([
    {
      position: 1,
      username: 'João',
      score: 14520,
    },
    {
      position: 2,
      username: 'Maria',
      score: 13840,
    },
    {
      position: 3,
      username: 'Pedro',
      score: 12980,
    },
  ]);

}