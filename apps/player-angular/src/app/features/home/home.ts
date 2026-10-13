import { Quiz } from '@/app/core/models/quiz.model';
import { QuizService } from '@/app/core/services/quiz.service';
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

  private readonly quizService = inject(QuizService);

  readonly quizzes = signal<Quiz[]>([]);

  readonly page = signal(1);

  readonly loading = signal(false);

  readonly hasMore = signal(true);

  readonly filters = signal({
    search: '',
    gameId: null as number | null,
    difficulty: null as string | null,
  });

  readonly categories = signal([
    {
      id: 1,
      name: 'Jogos',
    },
    {
      id: 2,
      name: 'Anime',
    },
    {
      id: 3,
      name: 'Filmes',
    },
    {
      id: 4,
      name: 'História',
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

  constructor() {

    this.loadQuizzes();
  }

  private loadQuizzes(): void {

    if (this.loading()) {

      return;
    }

    this.loading.set(true);

    this.quizService
      .search(
        this.page(),
        this.filters().search,
        this.filters().gameId,
        this.filters().difficulty,
      )
      .subscribe({
        next: response => {

          this.quizzes.update(
            current => [
              ...current,
              ...response.data,
            ]
          );

          this.hasMore.set(
            response.current_page <
            response.last_page,
          );

          this.loading.set(false);
        },
        error: error => {

          console.error(error);

          this.loading.set(false);
        },
      });
  }

  public search(
    search: string,
  ): void {

    this.filters.update(
      current => ({
        ...current,
        search,
      }),
    );

    this.resetAndReload();
  }

  public selectCategory(
    gameId: number,
  ): void {

    this.filters.update(
      current => ({
        ...current,
        gameId,
      }),
    );

    this.resetAndReload();
  }

  public selectDifficulty(
    difficulty: string,
  ): void {

    this.filters.update(
      current => ({
        ...current,
        difficulty,
      }),
    );

    this.resetAndReload();
  }

  public loadMore(): void {

    this.page.update(
      page => page + 1,
    );

    this.loadQuizzes();
  }

  private resetAndReload(): void {

    this.page.set(1);

    this.quizzes.set([]);

    this.hasMore.set(true);

    this.loadQuizzes();
  }
}