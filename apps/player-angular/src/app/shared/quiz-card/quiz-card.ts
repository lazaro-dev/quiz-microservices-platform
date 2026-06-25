import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

export interface QuizCardModel {
  id: number;
  title: string;
  slug: string;
  category: string;
  questions: number;
  plays: number;
}

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.scss',
})
export class QuizCard {

  readonly quiz = input.required<QuizCardModel>();
  private readonly router = inject(Router);

  toQuiz(slug: string): void {
    this.router.navigate([
      '/player',
      'quiz',
      slug,
    ]);
  }
}
