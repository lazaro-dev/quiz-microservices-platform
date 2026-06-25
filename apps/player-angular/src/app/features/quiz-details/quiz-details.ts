import { PlayerLayout } from '@/app/layouts/player-layout/player-layout';
import { LeaderboardCard } from '@/app/shared/leaderboard-card/leaderboard-card';
import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  ActivatedRoute,
} from '@angular/router';
import { QuizHeroComponent } from './quiz-hero/quiz-hero';

@Component({
  selector: 'app-quiz-details',
  standalone: true,
  imports: [
    PlayerLayout,
    LeaderboardCard,
    QuizHeroComponent,
  ],
  templateUrl: './quiz-details.html',
})
export class QuizDetails {

  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);

  readonly quiz = signal<any>(null);

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

  constructor() {
    this.route.paramMap.subscribe(params => {

      const slugParam = params.get('slug') ?? '';

      this.loadQuiz(slugParam);
    });
  }

  private loadQuiz(slugParam: string): void {

    console.log('Buscar quiz:', slugParam);

    /*
    this.quizService
      .findBySlug(slug)
      .subscribe(quiz => {
        this.quiz.set(quiz);
      });
    */

    this.quiz.set({
      id: 1,
      slug: slugParam,
      title: 'Você conhece Dark Souls?',
      description: 'Teste seus conhecimentos sobre bosses, NPCs e lore.',
      category: 'Jogos',
      difficulty: 'Médio',
      questionCount: 20,
      playCount: 1234,
      averageScore: 72,
      favoritesCount: 320,
      estimatedTime: 5,
      questionsCount: 20,
      totalPlays: 1284,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    });

    this.loading.set(false);
  }

  startQuiz(): void {

  }
  toggleFavorite(): void {

  }
}